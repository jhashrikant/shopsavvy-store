import SingleProductclient from './singleProductClient'

export const revalidate = 0;

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

async function fetchSingleProduct(params) {
    const response = await fetch(`${apiUrl}/api/getProducts`, {
        cache: 'no-store'
    })
    if (!response) {
        console.error(error)
        return;
    }
    const products = await response.json();
    const filterData = Object.values(products?.products)?.filter((product) => product?.slug === params?.slug)
   
    //here we are taking all products from db and filtering out that one product which is matching the slug 
    return filterData;
}



const SingleProduct = async ({ params }) => {

    const Products = await fetchSingleProduct(params);
    console.log(Products)

    return (
        <SingleProductclient Products={Products} />
        // <SingleProductclient params={params}/>
    )
}

export default SingleProduct;
