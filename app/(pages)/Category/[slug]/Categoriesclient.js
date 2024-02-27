import Image from "next/image"
import Link from "next/link"


const Categoriesclient = ({ Products }) => {

   
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {(Object.values(Products)?.length === 0) ? <p>No products in stock</p> :
                        Object.values(Products)?.map((product) => <div key={product.slug} className="group relative">
                            <Link href={`../singleProduct/${product.slug}`}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <Image height={500} width={500} src={product?.images?.[0]} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                    {/* <img src={product.product_image} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" /> */}
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <div href="#">
                                                <span aria-hidden="true" className="absolute inset-0"></span>
                                                {product.Product_name}
                                            </div>
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">&#8377;{product.price}</p>
                                </div>
                            </Link>
                        </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Categoriesclient
