
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


const products = [
    {
        id: 1,
        name: 'reebok Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Addidas Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Puma Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    // More products...
]

const Taglines = [
    {
        id: 1,
        tag: 'Premium Tshirts',
        Label: 'Our T-Shirts are 100% made of cotton'
    },
    {
        id: 2,
        tag: 'Free Shipping',
        Label: 'We ship all over India for FREE'
    },
    {
        id: 3,
        tag: 'Exciting Offers',
        Label: 'We provide amazing offers & discounts on our products!'
    }
]

export {
    indianStates,
    localStorage,
    IncreaseQuantity,
    decreaseQuantity,
    Taglines,
    products
}



// You can use this array to dynamically generate your dropdown options in JavaScript.

