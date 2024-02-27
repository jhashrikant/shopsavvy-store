
'use client';

import { useAuthContext } from "@/app/context/Authcontext"

const MyOrdersClient = ({ Orders = [] }) => {
	// console.log(Orders)

	const { authState, authDispatch } = useAuthContext()

	const { isAuthenticated, user } = authState

	console.log(user)

	// const filteredorders = Orders.filter(item => item.email === user.email)
	// console.log(filteredorders)


	return (
		// <main className="pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
		// 	<div className="mx-auto max-w-4xl">
		// 		<div className="px-4 sm:px-0">
		// 			<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
		// 			<p className="mt-2 text-sm text-gray-500">Check the status of recent orders, manage returns, and download invoices.</p>
		// 		</div>

		// 		<section aria-labelledby="recent-heading" className="mt-16">
		// 			<h2 id="recent-heading" className="sr-only">Recent orders</h2>

		// 			<div className="space-y-16 sm:space-y-24">
		// 				<div>
		// 					<h3 className="sr-only">Order placed on <time dateTime="2021-01-22">January 22, 2021</time></h3>

		// 					<div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
		// 						<dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
		// 							<div className="flex justify-between md:block">
		// 								<dt className="font-medium text-gray-900">Order number</dt>
		// 								<dd className="md:mt-1">WU88191111</dd>
		// 							</div>
		// 							<div className="flex justify-between pt-4 md:block md:pt-0">
		// 								<dt className="font-medium text-gray-900">Date placed</dt>
		// 								<dd className="md:mt-1">
		// 									<time dateTime="2021-01-22">January 22, 2021</time>
		// 								</dd>
		// 							</div>
		// 							<div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
		// 								<dt>Total amount</dt>
		// 								<dd className="md:mt-1">$302.00</dd>
		// 							</div>
		// 						</dl>
		// 						<div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
		// 							<a href="#" className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto">
		// 								View Order
		// 								<span className="sr-only">WU88191111</span>
		// 							</a>
		// 							<a href="#" className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto">
		// 								View Invoice
		// 								<span className="sr-only">for order WU88191111</span>
		// 							</a>
		// 						</div>
		// 					</div>

		// 					<div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
		// 						<div className="-my-6 divide-y divide-gray-200 sm:-my-10">
		// 							<div className="flex py-6 sm:py-10">
		// 								<div className="min-w-0 flex-1 lg:flex lg:flex-col">
		// 									<div className="lg:flex-1">
		// 										<div className="sm:flex">
		// 											<div>
		// 												<h4 className="font-medium text-gray-900">Nomad Tumbler</h4>
		// 												<p className="mt-2 hidden text-sm text-gray-500 sm:block">This durable double-walled insulated tumbler keeps your beverages at the perfect temperature all day long. Hot, cold, or even lukewarm if you&#039;re weird like that, this bottle is ready for your next adventure.</p>
		// 											</div>
		// 											<p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">$35.00</p>
		// 										</div>
		// 										<div className="mt-2 flex text-sm font-medium sm:mt-4">
		// 											<a href="#" className="text-indigo-600 hover:text-indigo-500">View Product</a>
		// 											<div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
		// 												<a href="#" className="text-indigo-600 hover:text-indigo-500">Buy Again</a>
		// 											</div>
		// 										</div>
		// 									</div>
		// 									<div className="mt-6 font-medium">
		// 										<p>Out for delivery</p>
		// 									</div>
		// 								</div>
		// 								<div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
		// 									<img src="https://tailwindui.com/img/ecommerce-images/order-history-page-06-product-01.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52" />
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>

		// 					<div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
		// 						<div className="-my-6 divide-y divide-gray-200 sm:-my-10">
		// 							<div className="flex py-6 sm:py-10">
		// 								<div className="min-w-0 flex-1 lg:flex lg:flex-col">
		// 									<div className="lg:flex-1">
		// 										<div className="sm:flex">
		// 											<div>
		// 												<h4 className="font-medium text-gray-900">Leather Long Wallet</h4>
		// 												<p className="mt-2 hidden text-sm text-gray-500 sm:block">Were not sure who carries cash anymore, but this leather long wallet will keep those bills nice and fold-free. The cashier hasnt seen print money in years, but youll make a damn fine impression with your pristine cash monies.</p>
		// 											</div>
		// 											<p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">$135.00</p>
		// 										</div>
		// 										<div className="mt-2 flex text-sm font-medium sm:mt-4">
		// 											<a href="#" className="text-indigo-600 hover:text-indigo-500">View Product</a>
		// 											<div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
		// 												<a href="#" className="text-indigo-600 hover:text-indigo-500">Buy Again</a>
		// 											</div>
		// 										</div>
		// 									</div>
		// 									<div className="mt-6 font-medium">
		// 										<p>Out for delivery</p>
		// 									</div>
		// 								</div>
		// 								<div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
		// 									<img src="https://tailwindui.com/img/ecommerce-images/order-history-page-06-product-02.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52" />
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>

		// 					<div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
		// 						<div className="-my-6 divide-y divide-gray-200 sm:-my-10">
		// 							<div className="flex py-6 sm:py-10">
		// 								<div className="min-w-0 flex-1 lg:flex lg:flex-col">
		// 									<div className="lg:flex-1">
		// 										<div className="sm:flex">
		// 											<div>
		// 												<h4 className="font-medium text-gray-900">Minimalist Wristwatch</h4>
		// 												<p className="mt-2 hidden text-sm text-gray-500 sm:block">This contemporary wristwatch has a clean, minimalist look and high quality components. Everyone knows youll never use it to check the time, but wow, does that wrist look good with this timepiece on it.</p>
		// 											</div>
		// 											<p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">$45.00</p>
		// 										</div>
		// 										<div className="mt-2 flex text-sm font-medium sm:mt-4">
		// 											<a href="#" className="text-indigo-600 hover:text-indigo-500">View Product</a>
		// 											<div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
		// 												<a href="#" className="text-indigo-600 hover:text-indigo-500">Buy Again</a>
		// 											</div>
		// 										</div>
		// 									</div>
		// 									<div className="mt-6 font-medium">
		// 										<p>Out for delivery</p>
		// 									</div>
		// 								</div>
		// 								<div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
		// 									<img src="https://tailwindui.com/img/ecommerce-images/order-history-page-06-product-03.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52" />
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</section>
		// 	</div>
		// </main>
		<div className="flex justify-center items-center mt-10">
			<h2 className="font-bold">Currently Work in progress....</h2>
		</div>

	)
}

export default MyOrdersClient
