
import MyOrdersClient from "./MyOrdersClient"

// const fetchOrdersofuser = async () => {
//     try {
//         const response = await fetch('http://localhost:3001/api/getOrders', {
//             cache: 'no-store'
//         })
//         if (!response.ok) throw new Error(`Failed to fetch products. Status: ${res.status}`);
//         else {
// 			const data = await response.json();
// 			return data
// 		}
//     } catch (error) {
//         console.log(error)
//     }
// }

const MyOrders = async () => {

    // const { Orders } = await fetchOrdersofuser()

    return (
        <MyOrdersClient  />
    )
}

export default MyOrders
