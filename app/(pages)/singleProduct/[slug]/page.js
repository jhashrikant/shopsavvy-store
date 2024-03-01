import SingleProductclient from './singleProductClient'

export const revalidate = 0;

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

console.log('line 7',process.env)

async function fetchSingleProduct(params) {
    console.log('connected to Db in singleproductspage');
    const response = await fetch(`${apiUrl}/api/getProducts`, {
        cache: 'no-store'
    })
    if (!response) {
        console.error(error)
        return;
    }
    const products = await response.json();
    console.log(products);
    console.log('line12 ', products)
    const filterData = Object.values(products?.products)?.filter((product) => product?.slug === params?.slug)
   
    //here we are taking all products from db and filtering out that one product which is matching the slug 
    console.log('filterdata', filterData)
    return filterData;
}



const SingleProduct = async ({ params }) => {
    console.log('RSC',params.slug);
    console.log("ASC",params)

    const Products = await fetchSingleProduct(params);
    console.log(Products)

    return (
        <SingleProductclient Products={Products} />
        // <SingleProductclient params={params}/>
    )
}

export default SingleProduct;
