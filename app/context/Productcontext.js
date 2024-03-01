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

    return (
        <Productcontext.Provider value={{ state, dispatch }}>
            {children}
        </Productcontext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(Productcontext)
}
