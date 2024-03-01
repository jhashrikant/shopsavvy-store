
import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
import Order from '@/Models/Order'
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {

    try {
        await connectToMongoDB();
        const body = await request.json();
        const { name, email, phone, address, zipCode, state, district, totalAmount, paymentStatus, products } = body;

        const orderId = uuidv4();

        console.log('order' ,orderId)

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
        console.log('order',order)
        return NextResponse.json({ message: 'Order created Successfully', response: true, order })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, response: false })
    }
}