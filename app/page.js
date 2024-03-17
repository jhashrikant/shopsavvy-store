import { Shirt } from 'lucide-react';
import Image from "next/image";
import billboard from '../images/billboard.png';
import { Taglines } from '@/common/utils';
import { products } from '@/common/utils';

export default function Home() {

	return (
		<>
			<div >
				<Image className="w-full h-full object-cover" src={billboard} alt='billboard' />
			</div>

			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products && products?.map(({ id, imageSrc, imageAlt, href, name, color, price }) => (
							<div key={id} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<Image
										width={400}
										height={400}
										src={imageSrc}
										alt={imageAlt}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={href}>
												<span aria-hidden="true" className="absolute inset-0" />
												{name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">{color}</p>
									</div>
									<p className="text-sm font-medium text-gray-900">{price}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<section className="text-gray-600 body-font">
				<div className="container px-5 py-20 mx-auto">
					<div className="flex flex-wrap -m-4">
						{Taglines?.map(({ id, tag, Label }) => (
							<div key={id} className="p-4 md:w-1/3">
								<div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
									<div className="flex items-center mb-3">
										<div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
											<Shirt />
										</div>
										<h2 className="text-gray-900 text-lg title-font font-medium">{tag}</h2>
									</div>
									<div className="flex-grow">
										<p className="leading-relaxed text-base">{Label}</p>

									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
