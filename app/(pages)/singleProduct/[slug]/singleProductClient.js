'use client';
import { useProductContext } from "@/app/context/Productcontext"
import Image from "next/image"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast'


const SingleProductclient = ({ Products }) => {

    const [selectedSize, setselectedSize] = useState('');

    const { state, dispatch } = useProductContext();
    const { cart } = state;

    function handlesize(size) {
        setselectedSize(size);
    }

    console.log(cart);

    const addToCart = async (product) => {
        //if existing product is cliked just increase the quantity else add a new product
        try {
            const isExistingItemAndSameSize = cart?.find((item) => item?.product_id === product?._id && item.size === selectedSize)
            const isSizeAvailable = product?.size?.find(sizes => sizes.size === selectedSize)
            const isQuantityAvailable = product?.size?.find(sizes => sizes.size === selectedSize)?.qty > 0
            console.log('line39', isSizeAvailable);
            console.log('line 40', isQuantityAvailable);
            if (isExistingItemAndSameSize) {
                if (isSizeAvailable && isQuantityAvailable) {
                    dispatch({
                        type: 'INCREMENT_QUANTITY',
                        payload: {
                            productid: product._id,
                            size: selectedSize
                        }
                    });
                    const updatedCart = cart?.map((item) => {
                        if (item.product_id === product._id && item.size === selectedSize) {
                            return { ...item, quantity: item.quantity + 1 }
                        } else {
                            return item
                        }
                    });
                    console.log(cart);
                    await localStorage.setItem('cart', JSON.stringify(updatedCart))
                    // await localStorage.setItem('cart', JSON.stringify(cart))  //this also works but issue is we take cart but its not updated to latest value of cart is 11 items local me 10 hoga kyuki apn ne 11 pe clock kriya but bhej rhe purana cart kyuki next render me updated hoga cart
                    toast.success("Product added to cart");
                }
            }
            else {
                if (selectedSize) {
                    if (isSizeAvailable && isQuantityAvailable) {
                        const cartItem = {
                            product_id: product._id,
                            Product_name: product.Product_name,
                            category: product.category,
                            description: product.description,
                            price: product.price,
                            product_image: product.images?.[0],
                            slug: product.slug,
                            size: selectedSize,
                            quantity: 1
                        };
                        dispatch({
                            type: 'ADD_TO_CART',
                            payload: cartItem
                        });
                        console.log(cart)
                        await localStorage.setItem('cart', JSON.stringify([cartItem, ...cart]))
                        toast.success("Product added to cart");
                    }
                    else {
                        toast.error('product not in stock')
                    }
                }
                else {
                    toast.error('pls select a size before adding to cart')
                }
            }
        }
        catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("An error occurred while adding the product to the cart")
        }
    }



    if (!Products) {
        return <div>Not found</div>
    } else {
        return (
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 pt-16 pb-24rem mx-auto">

                    {Products && Products?.map((product) =>
                        <div key={product.slug} className="lg:w-4/5 mx-auto flex flex-wrap">
                            <Image width={500} height={500} alt="ecommerce" className="lg:w-1/2 w-full lg:h-full h-full object-cover object-center rounded" src={product.images?.[0]} />

                            < div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0" >
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.slug.split(' ')[0] || product.Product_name}</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.Product_name}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">4 Reviews</span>
                                    </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                        <a className="text-gray-500">
                                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                            </svg>
                                        </a>
                                        <a className="text-gray-500">
                                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                            </svg>
                                        </a>
                                        <a className="text-gray-500">
                                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                                <p className="leading-relaxed font-semibold">{product.description}</p>

                                <h1 className="text-2xl font-semibold mt-6">Available Sizes</h1>
                                
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                    <div className="flex items-center justify-center ">
                                        <span className="mr-3 font-bold text-xl">Size</span>
                                        {product?.size?.map((sizes, index) => (
                                            <div onClick={() => handlesize(sizes.size)} key={index} className={`${sizes?.size === selectedSize ? 'bg-gray-950 text-white' : ''} text-base font-medium mx-2 hover:bg-gray-200 border shrink-0 rounded-lg w-10 h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 flex justify-center items-center lg:text-xl border-gray-600 cursor-pointer`}>{sizes.size}</div>
                                        ))}

                                    </div>
                                    <div className="flex ml-6 items-center">
                                        <div className="relative">
                                            {/* Display availability information */}
                                            {selectedSize && <div>{`Only ${product?.size?.find((sizeObj) => sizeObj?.size === selectedSize)?.qty} left for size ${selectedSize}. Hurry up!`}</div>}
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">&#8377;{product.price}</span>
                                    <button onClick={() => addToCart(product)} className="flex ml-auto text-white bg-indigo-500 hover:bg-indigo-600 border-0 py-2 px-5 focus:outline-none  rounded ">Add to Cart</button>

                                </div>
                            </div>
                        </div>)
                    }
                </div >
                <Toaster />
            </section >
        )
    }
}


export default SingleProductclient;