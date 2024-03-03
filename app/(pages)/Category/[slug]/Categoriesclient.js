import Image from "next/image"
import Link from "next/link"


const Categoriesclient = ({ Products }) => {

	return (
		//   <div className="bg-white">
		//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		//           <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		//               {(Object.values(Products)?.length === 0) ? <p>No products in stock</p> :
		//                   Object.values(Products)?.map((product) => <div key={product.slug} className="group relative">
		//                       <Link href={`../singleProduct/${product.slug}`}>
		//                           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
		//                               <Image height={500} width={500} src={product?.images?.[0]} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />

		//                           </div>
		//                           <div className="mt-4 flex justify-between">
		//                               <div>
		//                                   <h3 className="text-sm text-gray-700">
		//                                       <div href="#">
		//                                           <span aria-hidden="true" className="absolute inset-0"></span>
		//                                           {product.Product_name}
		//                                       </div>
		//                                   </h3>
		//                               </div>
		//                               <p className="text-sm font-medium text-gray-900">&#8377;{product.price}</p>
		//                           </div>
		//                       </Link>
		//                   </div>
		//                   )}
		//           </div>
		//       </div>
		//   </div>

		<div class="font-[sans-serif]">
			<div class="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-full">
				<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{Object.values(Products).length === 0 ? <div>No products in stock</div> :
						Object.values(Products).map((product) => {
							return <div key={product.slug} class="bg-white rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all">
								<Link href={`../singleProduct/${product.slug}`}>
									<div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
										<Image height={500} width={500} src={product?.images?.[0]} alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-top" />
									</div>
									<div class="p-6">
										<h3 className="text-lg font-bold text-gray-800">{product.Product_name}</h3>
										<div className="mt-4 flex items-center flex-wrap gap-2">
											<p className="text-lg text-gray-700">&#8377;{product.price}</p>
											<div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto">
												<svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-gray-800 inline-block" viewBox="0 0 64 64">
													<path
														d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
														data-original="#000000"></path>
												</svg>
											</div>
										</div>
									</div>
								</Link>
							</div>
						})}
				</div>
			</div>
		</div>
	)
}

export default Categoriesclient
