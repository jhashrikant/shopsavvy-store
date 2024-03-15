import SingleProductclient from './singleProductClient'
export const revalidate = 0;

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

async function fetchSingleProduct(params) {
    try {
        const response = await fetch(`${apiUrl}/api/fetchsingleproduct?slug=${params?.slug}`, {
            cache: 'no-store'
        })
        if (!response.ok) {
            console.error(error)
            return;
        }
        const data = await response.json();
        console.log('data', data)
        return data?.products
    } catch (error) {
        console.log(error)
    }
}



const SingleProduct = async ({ params }) => {

    const Products = await fetchSingleProduct(params);

    return (
        <SingleProductclient Products={Products} />
    )
}

export default SingleProduct;
