import connectToMongoDB from "@/Database/MongoDB"
import { NextResponse } from "next/server"
import Product from '@/Models/Product'

export async function GET(request , { params }) {
    const slug = params.slug
    try {
        // const slug = request.query
        console.log('ppp', params)
        await connectToMongoDB();
        const singleProduct = await Product.findOne({ slug: slug })
        if (!singleProduct) {
            return NextResponse.json({ message: "Product Not found", response: false })
        }
        console.log('line 13', singleProduct)
        return NextResponse.json({ message: "success", product: singleProduct, response: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Some error occured", error, response: false })
    }
}