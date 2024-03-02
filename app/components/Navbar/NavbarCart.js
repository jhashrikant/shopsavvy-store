"use client";
import React, { useRef, useState } from 'react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';
import styles from '/styles/Navbar.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useProductContext } from '@/app/context/Productcontext';
import { useAuth } from '@/app/context/Authcontext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NavbarCart = () => {

    const router = useRouter()

    const [isActive, setIsActive] = useState(false);
    const ref = useRef();


    function togglecart() {
        setIsActive((prevIsActive) => {
            return !prevIsActive
        });
    }

    const { state, dispatch } = useProductContext()


    console.log(state, dispatch);

    const { cart, totalPrice } = state;
    console.log("cartvalue in navbar", cart)
    console.log('cart', cart)

    console.log(cart)

    const handlecheckout = () => {
        togglecart()
        router.push('/Checkout')
    }


    const IncreaseQuantity = async (product) => {
        dispatch({
            type: 'INCREMENT_QUANTITY',
            payload: {
                productid: product.product_id,
                size: product.size
            }
        })
        const updatedCart = cart?.map((item) => {
            if (item.product_id === product.product_id && item.size === product.size) {
                return { ...item, quantity: item.quantity + 1 }
            } else {
                return item
            }
        })
        console.log(cart);
        await localStorage.setItem('cart', JSON.stringify(updatedCart))
        toast.success('item added in cart');
    }

    const clearCart = async () => {
        dispatch({
            type: 'CLEAR_CART',
            payload: []
        })
        await localStorage.removeItem('cart');
        if (cart.length === 0) {
            toast.success('No items in cart');
        } else {
            toast.success('Cart Cleared');
        }
    }


    const decreaseQuantity = async (product) => {
        dispatch({
            type: 'DECREMENT_QUANTITY',
            payload: {
                productid: product.product_id,
                size: product.size
            }
        })
        const updatedCart = cart?.map((item) => {
            if (item.product_id === product.product_id && item.size === product.size) {
                return { ...item, quantity: item.quantity - 1 }
            } else {
                return item
            }
        }).filter(item => item.quantity > 0);
        console.log(cart);
        await localStorage.setItem('cart', JSON.stringify(updatedCart))
        toast.success('Item removed from cart');
    }
    return (
        <>
            <div className="absolute right-0 mx-5">
                <button onClick={togglecart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    {cart.length > 0 && (
                        <span className="absolute top-[-2px] right-[-2px] bg-red-500 text-white text-xs rounded-full px-1">{cart.length}</span>
                    )}
                </button>
            </div>

            <div ref={ref} className={`${styles.sideCart} ${isActive ? styles.active : ""} fixed overflow-y-scroll py-10 px-8 bg-indigo-50`}>
                <h2 className="text-lg text-left font-bold text-gray-900" id="slide-over-title">Shopping cart</h2>
                <span onClick={togglecart} className="absolute top-10 right-2 cursor-pointer text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <ol className="list-none items-center font-semibold">
                    {(cart && cart?.length === 0) ? <h3 className='font-semibold'>No items in cart</h3> :
                        cart?.map((cartItem, index) => (
                            <li key={index}>
                                <div className="item flex my-5">
                                    <div className="w-2/12">
                                        <Image width={100} height={100} src={cartItem.product_image} alt={cartItem.Product_name} className="h-20 w-20 object-cover" />
                                    </div>
                                    <div className="w-5/12 flex flex-col ml-4 font-semibold">
                                        <div>{cartItem.Product_name} ({cartItem.size})</div>
                                    </div>
                                    <div className="w-5/12 flex items-center justify-start flex-col font-semibold">
                                        <div className=''>&#8377; {cartItem.price}</div>
                                        <div className='flex items-center justify-center mt-2'>
                                            <AiFillPlusCircle onClick={() => IncreaseQuantity(cartItem)} className="cursor-pointer text-lg text-green-600" />
                                            <span className="mx-2">{cartItem.quantity}</span>
                                            <AiFillMinusCircle onClick={() => decreaseQuantity(cartItem)} className="cursor-pointer text-lg text-red-600" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ol>

                <span className='total font-bold'>Subtotal : &#8377; {totalPrice}</span>
                <div className="flex">
                    <button onClick={handlecheckout} className="flex mr-2 mt-6 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm ">
                        <BsFillBagCheckFill className='m-1' />
                        Checkout
                    </button>

                    <button onClick={clearCart} className="flex mr-2 mt-6 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm ">
                        Clear cart
                    </button>
                </div>
                <Toaster />
            </div>


        </>
    )
}

export default NavbarCart
