'use client';
import React, { createContext, useContext, useEffect, useReducer } from "react";
import ProductsReducer from "../Reducers/ProductReducer";

export const Productcontext = createContext(); //creating context


export default function Productprovider({ children }) {

    const [state, dispatch] = useReducer(ProductsReducer, {
        cart: [],
        products: {},
        totalPrice: 0
    })

  

    useEffect(() => {
        const ItemsInlocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        if (ItemsInlocalStorage) {
            dispatch({
                type: 'INITIALIZE_CART',
                payload: ItemsInlocalStorage
            })
        }
    }, [])

    useEffect(() => {
        const totalPrice = state.cart && state.cart?.reduce((acc, curr) => {
            return acc + curr?.quantity * curr?.price
        }, 0)
        dispatch({
            type: 'SET_SUB_TOTAL',
            payload: totalPrice
        })
    }, [state?.cart])

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const res = await fetch(`http://localhost:3000/api/getProducts`, {
    //                 cache: 'no-store'
    //             });

    //             if (!res.ok) {
    //                 throw new Error(`Failed to fetch products. Status: ${res.status}`);
    //             }
    //             const response = await res.json();
    //             const products = response?.products;

    //             dispatch({
    //                 type: 'ADD_ALL_PRODUCTS',
    //                 payload: products
    //             });
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //             // Handle error (e.g., show a message to the user)
    //         }
    //     }
    //     fetchProducts();
    // }, []);

    return (
        <Productcontext.Provider value={{ state, dispatch }}>
            {children}
        </Productcontext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(Productcontext)
}
