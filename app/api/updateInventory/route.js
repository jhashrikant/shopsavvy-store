import connectToMongoDB from "@/Database/MongoDB"
import { NextResponse } from "next/server"
import Product from '@/Models/Product'

export async function PATCH(request) {
   try {
      await connectToMongoDB()
      const { cart } = await request.json()
      cart.forEach(async (item) => {
         const { product_id, quantity } = item
         await Product.findByIdAndUpdate({ _id: product_id }, { $inc: { qty: -quantity } }, { new: true });
      })
      return NextResponse.json({ message: "Inventory updated successfully", response: true });

   } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Some issue occured", response: false })
   }
}