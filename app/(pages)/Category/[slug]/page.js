import Categoriesclient from "./Categoriesclient";
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

async function fetchProductsbyCategories(params) {
    console.log('connected to Db in singleproductspage');
    const response = await fetch(`${apiUrl}/api/getProducts`, {
        cache: 'no-store'
    })
    if (!response.ok) {
        console.error(error)
        return;
    }
    const products = await response.json();
    console.log(products);
    console.log('line12 ', products)
    const filterData = Object.values(products?.products)?.filter((product) => product?.category === params?.slug)
    //here we are taking all products from db and filtering out that  product which is matching the category 
    console.log('filterdata', filterData)
    return filterData;
}

const Productsbycategories = async ({ params }) => {
    const Products = await fetchProductsbyCategories(params);

    return (
        <Categoriesclient Products={Products} />
    )
}

export default Productsbycategories
