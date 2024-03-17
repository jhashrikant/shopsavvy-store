'use client'
import toast from "react-hot-toast";
import { useProductContext } from "../context/Productcontext";

export const useCart = () => {

  const { state, dispatch } = useProductContext()
  const { cart } = state;

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
    updateLocalStorage(updatedCart)
    showNotification('item added in cart')
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
    updateLocalStorage(updatedCart)
    showNotification('Item removed from cart');
  }

  const clearCart = async () => {
    dispatch({
      type: 'CLEAR_CART',
      payload: []
    })
    await localStorage.removeItem('cart');
    if (cart.length === 0) {
      showNotification('No items in cart')
    } else {
      showNotification('Cart Cleared')
    }
  }

  const removeProductfromCart = async (product) => {
    const updatedCart = cart?.filter(item => item !== product)
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: updatedCart
    })
    updateLocalStorage(updatedCart)
    showNotification("item removed from cart");
  }

  const updateLocalStorage = async (updatedCart) => {
    await localStorage.setItem('cart', JSON.stringify(updatedCart))
  };

  const showNotification = (message) => {
    toast.success(message);
  };

  return { IncreaseQuantity, decreaseQuantity, clearCart, removeProductfromCart }

}