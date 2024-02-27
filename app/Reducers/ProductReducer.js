'use client';

function ProductsReducer(state, action) {
    // cart: [],
    // products: {} state is basically this cart and products
    //action is basically what we give in dispatch like INCREMENT, DECREEMENT ADD_PRODUCT like that
    switch (action.type) {
        case 'ADD_ALL_PRODUCTS':
            // console.log(action.payload)
            return {
                ...state, ///baki sab waise hi rkho and products me bas change kro
                products: action.payload
            }

        case 'ADD_TO_CART':
            console.log(state.cart)
            console.log(action.payload)
            return {
                ...state, //baki sab products waise hi rko and bas cart me add kro
                // cart: action.payload  
                cart: [action.payload, ...state.cart] //cart me bhi phle ke jaise hai rkho and new add kro
            }

        case 'INCREMENT_QUANTITY':
            const incrementedCart = state.cart.map((item) => {
                console.log(item)
                console.log(item.slug)
                console.log(action.payload)
                if (item.product_id === action.payload.productid && item.size === action.payload.size) {
                    console.log('Found matching product:', item);
                    console.log('Incrementing quantity by 1...');
                    return { ...item, quantity: item.quantity + 1 }
                }
                else {
                    return item
                }
            })

            return {
                ...state,
                cart: incrementedCart
                // cart: [...state.cart.map((item) => item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)]
            }


        case 'DECREMENT_QUANTITY':
            const decrementedCart = state.cart.map((item) => {
                if (item.product_id === action.payload.productid && item.size === action.payload.size) {
                    console.log('Found matching product:', item);
                    console.log('Incrementing quantity by 1...');
                    return { ...item, quantity: item.quantity - 1 }
                }
                else {
                    return item
                }
            }).filter((item) => item.quantity > 0)
            return {
                ...state,
                cart: decrementedCart
                // cart: state.cart.map((item) => item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0)
            }

        case 'CLEAR_CART':
            return {
                ...state,
                cart: action.payload
            }

        case 'INITIALIZE_CART':
            return {
                ...state,
                cart: action.payload
            }

        case 'SET_SUB_TOTAL':
            return {
                ...state,
                totalPrice: action.payload
            }

        // case 'RESET_CART':
        //     return {
        //         ...state,
        //         cart: action.payload
        //     }

        default:
            return state;
    }
}

export default ProductsReducer;