import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
import Order from '@/Models/Order'

export async function GET(request) {
   try {
      await connectToMongoDB()
      const email = request.nextUrl.searchParams.get("email")
      const Orders = await Order.find({ email: email })
      if (!Orders) {
         return NextResponse.json({ message: "No orders found for this user", response: false })
      }
      return NextResponse.json({ message: 'Orders fetched Successfully', Orders, response: true })

   } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "some error occured", error, response: false })
   }
}