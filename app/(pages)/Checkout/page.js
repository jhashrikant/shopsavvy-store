'use client';
import { useEffect, useState } from "react";
import { useProductContext } from "@/app/context/Productcontext";
import { indianStates } from "@/common/utils";
import { useAuthContext } from "@/app/context/Authcontext";
import { useRouter } from 'next/navigation'
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import BuyProduct from "@/app/components/razorpay/BuyProduct";
import Image from "next/image";
import { Trash2 } from 'lucide-react';
import { useCart } from "@/app/hooks/useCart";

const Checkout = () => {

	const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_BASE_URL_CLIENT : 'http://localhost:3000';

	const router = useRouter()

	const { IncreaseQuantity, decreaseQuantity ,removeProductfromCart} = useCart()

	const { authState } = useAuthContext()
	const { isAuthenticated } = authState

	const { state, dispatch } = useProductContext();
	const { cart, totalPrice } = state

	const productsOrdered = cart ? cart.map((item) => {
		const { Product_name, price, product_id, quantity, size } = item;
		return { Product_name, price, product_id, quantity, size };
	}) : [];

	console.log('cart', cart)


	const [isLoading, setIsLoading] = useState(false);
	const [formdata, setformdata] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		zipCode: '',
		state: '',
		district: '',
		totalAmount: totalPrice,
		paymentStatus: false,
		products: productsOrdered
	})
	console.log(formdata);
	// console.log(formdata.products)

	const resetForm = () => {
		setformdata({
			name: '',
			email: '',
			phone: '',
			address: '',
			zipCode: '',
			state: '',
			district: '',
			totalAmount: totalPrice,
			paymentStatus: false,
			products: productsOrdered
		});
	};

	const handleBuyNow = async () => {
		if (!cart || cart.length === 0) {
			toast.error("Your cart is empty. Please add products before proceeding to checkout.");
			return;
		}
		//check if all form fields are filled
		const requiredFields = ['name', 'email', 'phone', 'address', 'zipCode', 'state', 'district'];
		const missingfields = requiredFields?.filter((field) => !formdata[field])
		if (missingfields.length > 0) {
			toast.error(`Please enter all the valid fields: ${missingfields.join(', ')}`);
			return;
		}
		setIsLoading(true)

		//create a order in database
		try {
			const response = await fetch(`${apiUrl}/api/createorder`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formdata),
			})
			if (!response.ok) {
				toast.error("some error occured , we didnt get response from server")
				return;
			}
			const data = await response.json();
			if (!data.response) {
				toast.error(data.message)
				setIsLoading(false)
				return;
			} else {
				makePayment(data?.order?.orderId)
			}
		}
		catch (error) {
			console.error('some error occured');
			toast.error(error.message || "An error occurred. Please try again.")
		}
	}

	const handleChange = (event) => {
		setformdata((prevformdata) => {
			return {
				...prevformdata,
				[event.target.name]: event.target.value
			}
		})
	}

	const UpdateInventory = async (cart) => {
		try {
			const response = await fetch(`${apiUrl}/api/updateInventory`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					cart: cart,
				}),
			});
			console.log(response);

			if (!response.ok) {
				console.error("Failed to update inventory");
				return;
			}
			const data = await response.json();
			if (data.response) {
				console.log("Inventory updated successfully");
			}
		} catch (error) {
			console.error("Error updating inventory:", error);
		}
	}


	const makePayment = async (orderId) => {

		try {
			const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
			console.log(key);
			const data = await fetch(`${apiUrl}/api/razorpay`);
			const { order } = await data.json();
			console.log(order.id);
			console.log(order)
			const options = {
				key: key,
				name: "Shopsavvy",
				currency: order.currency,
				amount: order.amount,
				order_id: order.id,
				description: "Shopsavvy",
				// image: logoBase64,
				handler: async function (response) {
					// if (response.length==0) return <Loading/>;
					console.log('line 31', response);

					const paymentData = {
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_order_id: response.razorpay_order_id,
						razorpay_signature: response.razorpay_signature,
					};

					const verifyResponse = await fetch(`${apiUrl}/api/paymentverify`, {
						method: "POST",
						// headers: {
						//   // Authorization: 'YOUR_AUTH_HERE'
						// },
						body: JSON.stringify(paymentData),
					});

					const verifyResult = await verifyResponse.json();
					console.log("response verify==", verifyResult)

					if (verifyResult?.message === "success") {
						resetForm()
						// router.push("/paymentsuccess?paymentid=" + response.razorpay_payment_id)
						router.push(`/paymentsuccess?paymentid=${response.razorpay_payment_id}`);
						console.log('heoloo')
						dispatch({
							type: 'CLEAR_CART',
							payload: []
						})
						updatePaymentStatus(orderId)
					}
					else {
						toast.error("Payment verification failed. Please try again.")
					}
				},
				prefill: {
					name: "shopsavvy",
					email: "shopsavvy@gmail.com",
					contact: "9561902867",
				},
			};

			const paymentObject = new window.Razorpay(options);
			paymentObject.open();
			setIsLoading(false)
			paymentObject.on("payment.failed", function (response) {
				toast.error("Payment failed. Please try again. Contact support for help");

			});

		} catch (error) {
			console.error('Error during payment:', error);
			toast.error(error || 'An error occurred during payment. Please try again.');
			setIsLoading(false)
		}
		finally {
			setIsLoading(false)
		}
	};

	const updatePaymentStatus = async (orderId) => {
		try {
			const response = await fetch(`${apiUrl}/api/updatepaymentstatus`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orderId: orderId,
					paymentStatus: true
				}),
			});
			console.log(response);

			if (!response.ok) {
				console.error("Failed to update payment status in the database");
				return;
			}
			const data = await response.json();
			console.log(data)
			if (!data.response) {
				toast.error(data.message)
				return;
			}
			//remove the product from db
			UpdateInventory(cart)
			// else toast.success(toast.message)
			console.log("Payment status updated successfully in the database");
		} catch (error) {
			console.error("Error updating payment status:", error);
			toast.error(error)
		}
	};


	const handleIncrease = (product) => {
		IncreaseQuantity(product)
	}

	const handleDecrease = (product) => {
		decreaseQuantity(product)
	}

	const handleremoveProduct = (cartItem)=>{
		removeProductfromCart(cartItem)
	}

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/Login');
		}
	}, [isAuthenticated])

	return (
		<>
			<div>
				<div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
					<Link href="/" className="text-2xl font-medium text-indigo-500">Shopsavvy</Link>
				</div>
				<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
					<div className="px-4 pt-8">
						<p className="text-xl font-medium">Order Summary</p>
						<div className="mx-auto mt-8 max-w-2xl md:mt-12">
							<div className="bg-white shadow">
								<div className="px-4 py-6 sm:px-8 sm:py-10">
									<div className="flow-root">
										<ul className="-my-8">
											{cart?.length === 0 ? <div>Cart is empty ! Continue Shopping</div> :
												cart?.map((cartItem, index) => {
													return <li key={index} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
														<div className="shrink-0">
															<Image width={100} height={100} className="h-20 w-16 max-w-full rounded-lg object-cover" src={cartItem?.product_image} alt={cartItem?.product_image} />
														</div>

														<div className="relative flex flex-1 flex-col justify-between">
															<div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
																<div className="pr-8 sm:pr-5">
																	<p className="text-base font-semibold text-gray-900">{cartItem.Product_name}({cartItem.size})</p>
																	{/* <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{}</p> */}
																</div>

																<div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
																	<p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">&#8377;{cartItem.price}</p>

																	<div className="sm:order-1">
																		<div className="mx-auto flex h-8 items-stretch text-gray-600">
																			<button onClick={() => handleDecrease(cartItem)} title="Decrease quantity" className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-red-600 hover:text-white">-</button>
																			<div className="flex w-full items-center justify-center bg-gray-100 px-4 font-semibold text-xs uppercase transition">{cartItem.quantity}</div>
																			<button onClick={() => handleIncrease(cartItem)} title="Increase quantity" className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-green-600 hover:text-white">+</button>
																		</div>
																	</div>
																</div>
															</div>

															<div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
																<button onClick={() => handleremoveProduct(cartItem)} type="button" title="Remove product from cart" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
																	<Trash2 className="h-6 w-6" />
																</button>
															</div>
														</div>
													</li>
												})}

										</ul>
									</div>

									<div className="mt-6 border-t border-b py-2">
										<div className="flex items-center justify-between">
											<p className="text-sm text-gray-400">Subtotal</p>
											<p className="text-lg font-semibold text-gray-900">&#8377; {totalPrice}</p>
										</div>
										{/* <div className="flex items-center justify-between">
											<p className="text-sm text-gray-400">Shipping</p>
											<p className="text-lg font-semibold text-gray-900">$8.00</p>
										</div> */}
									</div>
									<div className="mt-6 flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">Total</p>
										<p className="text-2xl font-semibold text-gray-900">&#8377; {totalPrice}</p>
									</div>
									{/* <div className="text-lg font-bold">Subtotal : &#8377; {totalPrice}</div> */}
								</div>

							</div>
						</div>
					</div>
					<div className="mt-5 grid gap-6">
						<div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
							<p className="text-xl font-medium">Payment Details</p>
							<p className="text-gray-400">Complete your order by providing your payment details.</p>
							<div className="">
								<label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Name</label>
								<div className="relative">
									<input value={formdata?.name} onChange={handleChange} type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="John Doe" />
								</div>


								<label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
								<div className="relative">
									<input value={formdata?.email} onChange={handleChange} type="email" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your email here" />
								</div>

								<label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Phone No</label>
								<div className="relative">
									<input value={formdata?.phone} onChange={handleChange} type="number"  id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your 10 digit phone number" />
								</div>



								<label htmlFor="address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
								<div className="flex flex-col sm:flex-row">
									<div className="relative flex-shrink-0 w-full">
										<textarea value={formdata?.address} onChange={handleChange} type="text" id="address" name="address" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
									</div>
								</div>

								<label htmlFor="zipCode" className="mt-4 mb-2 block text-sm font-medium">PinCode</label>
								<div className="relative mt-4 mb-2">
									<input value={formdata?.zipCode} onChange={handleChange} type="number" name="zipCode" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-2/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your PinCode" />
								</div>

								<label htmlFor="state" className="mt-4 mb-2 block text-sm font-medium">State</label>
								<div className="relative mt-4 mb-2">
									<select value={formdata?.state} onChange={handleChange} type="text" name="state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
										<option>Select State</option>
										{indianStates?.map((states, index) => (
											<option key={index}>{states}</option>
										))}
									</select>
								</div>


								<label htmlFor="district" className="mt-4 mb-2 block text-sm font-medium">District</label>
								<div className="flex flex-col sm:flex-row">
									<div className="relative flex-shrink-0 w-full">
										<input value={formdata?.district} onChange={handleChange} type="text" id="district" name="district" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="" />
									</div>
								</div>

								<div className="mt-6 border-t border-b py-2">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">Subtotal</p>
										<p className="font-semibold text-gray-900">&#8377;{totalPrice}</p>
									</div>
								</div>
								<div className="mt-6 flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900">SubTotal</p>
									<p className="text-2xl font-semibold text-gray-900">&#8377;{totalPrice}</p>
								</div>
							</div>
							<BuyProduct handleBuyNow={handleBuyNow} isLoading={isLoading} />
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	)
}

export default Checkout
