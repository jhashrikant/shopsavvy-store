
const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
];

const localStorage = () => {
    const get = (key) => {
        return localStorage.getItem(key)
    }

    const set = (key, value) => {
        if (!key || !value) return;
        localStorage.setItem(key, value)
    }

    const remove = (key) => {
        localStorage.removeItem(key)
    }

    const clear = () => {
        localStorage.clear()
    }

    return {
        get,
        set,
        remove,
        clear
    }
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
    await localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast.success('item added in cart');
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

    await localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast.success('Item removed from cart');
}

export {
    indianStates,
    localStorage,
    IncreaseQuantity,
    decreaseQuantity
}



// You can use this array to dynamically generate your dropdown options in JavaScript.

