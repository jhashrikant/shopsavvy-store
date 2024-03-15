import Categoriesclient from "./Categoriesclient";
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

async function fetchProductsbyCategories(params) {
    try {
        const response = await fetch(`${apiUrl}/api/fetchProductsbyCategories?category=${params?.slug}`, {
            cache: 'no-store'
        })
        if (!response.ok) {
            console.error(error)
            return;
        }
        const data = await response.json();
        console.log('data' ,data)
        return data?.products 
    } catch (error) {
        console.log(error)
    }
}

const Productsbycategories = async ({ params }) => {
    const Products = await fetchProductsbyCategories(params);
    return (
        <Categoriesclient Products={Products} />
    )
}
export default Productsbycategories
