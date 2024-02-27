
import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
import Order from '@/Models/Order'

export async function POST(request) {

    try {
        await connectToMongoDB();
        const body = await request.json();
        const { orderId, name, email, phone, address, zipCode, state, district, totalAmount, paymentStatus, products } = body;

        const order = new Order({
            orderId: orderId,
            products: products,
            name: name,
            address: address,
            paymentStatus: paymentStatus,
            totalAmount: totalAmount,
            phone: phone,
            email: email,
            zipCode: zipCode,
            state: state,
            district: district
        })
        await order.save()
        return NextResponse.json({ message: 'Order created Successfully', response: true, order })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, response: false })
    }
}