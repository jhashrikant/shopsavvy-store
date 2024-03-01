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

const Checkout = () => {

	const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_BASE_URL_CLIENT : 'http://localhost:3000';

	const router = useRouter()

	const { authState } = useAuthContext()
	const { isAuthenticated } = authState

	const { state, dispatch } = useProductContext();
	const { cart, totalPrice } = state


	const productsOrdered = cart && cart?.map((item) => {
		const { Product_name, price, product_id, quantity, size } = item;
		return { Product_name, price, product_id, quantity, size };
	})


	console.log(productsOrdered)
	console.log(cart)

	const [isLoading, setIsLoading] = useState(false);;


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

	console.log(formdata)

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
		console.log(formdata?.products)
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
		console.log(formdata)

		//create a order in database
		try {
			const response = await fetch(`${apiUrl}/api/createorder`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formdata),
			})
			console.log(response)
			if (!response.ok) {
				toast.error("some error occured , we didnt get response from server")
				return;
			}
			const data = await response.json();
			console.log(data)
			if (!data.response) {
				toast.error(data.message)
				return;
			} else {
				console.log(data.message)
				console.log(data.order)
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


	const makePayment = async (orderId) => {
		console.log('helo', orderId)
		setIsLoading(true)
		
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
			toast.error(errror || 'An error occurred during payment. Please try again.');
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
			// else toast.success(toast.message)
			console.log("Payment status updated successfully in the database");
		} catch (error) {
			console.error("Error updating payment status:", error);
			
			toast.error(error)
		}
	};


	useEffect(() => {
		if (!isAuthenticated) {
			// router.push('/Login');
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
						<p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
						<div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
							{cart.length === 0 ? <div>Cart is empty ! Continue Shopping</div> :
								cart && cart?.map((cartItem, index) => (
									<div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
										<Image width={100} height={100} className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cartItem?.product_image} alt="" />
										<div className="flex w-full flex-col px-4 py-4">
											<span className="font-semibold">{cartItem.Product_name}({cartItem.size})</span>
											<span className="float-right text-gray-400">Quantity ={cartItem.quantity}</span>
											<p className="text-lg font-bold">&#8377;{cartItem.price}</p>
										</div>
									</div>
								))}
						</div>
						<div className="text-lg font-bold">Subtotal : &#8377; {totalPrice}</div>
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
									<input value={formdata?.phone} onChange={handleChange} type="text" id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your 10 digit phone number" />
								</div>



								<label htmlFor="address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
								<div className="flex flex-col sm:flex-row">
									<div className="relative flex-shrink-0 w-full">
										<textarea value={formdata?.address} onChange={handleChange} type="text" id="address" name="address" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
									</div>
								</div>

								<label htmlFor="zipCode" className="mt-4 mb-2 block text-sm font-medium">ZipCode</label>
								<div className="relative mt-4 mb-2">
									<input value={formdata?.zipCode} onChange={handleChange} type="text" name="zipCode" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-2/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
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
