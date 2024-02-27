import connectToMongoDB from '@/Database/MongoDB';
import Order from '@/Models/Order'
import { NextResponse } from 'next/server';

export async function PATCH(request) {
    try {
        await connectToMongoDB()

        const body = await request.json();
        const { orderId, paymentStatus } = body

        if (!orderId) {
            return NextResponse.json({ message: "Please provide the Orderid to update and the data", response: false })
        }
        const updatedPaymentStatus = await Order.findOneAndUpdate({ orderId: orderId }, {
            paymentStatus
        }, { new: true })

        if (!updatedPaymentStatus) {
            return NextResponse.json({ message: "Order not found", response: false })
        }
        return NextResponse.json({ message: "paymentStatus Updated successfully", updatedPaymentStatus, response: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "some error occured", error, response: false })
    }
}