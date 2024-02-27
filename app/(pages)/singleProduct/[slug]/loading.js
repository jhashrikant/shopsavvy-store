import style from '/styles/skeleton.module.css';

export default function Loading() {
	return (
		<>
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 pt-16 pb-24rem mx-auto">
					<div className="lg:w-4/5 mx-auto flex flex-wrap">
						<div className="lg:w-1/2 w-full lg:h-auto h-full object-contain object-top rounded overflow-hidden">
							<div className={`${style.skeleton} w-full h-full`}></div>
						</div>
						<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
							<h2 className={`${style.skeleton} w-1/2 h-6 mb-2`}></h2>
							<h1 className={`${style.skeleton} w-full h-12 mb-4`}></h1>
							<div className="flex mb-4">
								<span className={`${style.skeleton} w-24 h-6 mr-4`}></span>
							</div>
							<p className={`${style.skeleton} w-full h-40 mb-6`}></p>
							<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
								<div className={`${style.skeleton} w-1/4 h-10 mr-4`}></div>
							</div>
							<div className="flex">
								<span className={`${style.skeleton} w-1/4 h-12 mr-4`}></span>
								<button className={`${style.skeleton} w-32 h-12 ml-auto`}></button>
								<button className={`${style.skeleton} w-10 h-10 bg-gray-200 ml-4 rounded-full`}></button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}