import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
import Order from '@/Models/Order'
import { v4 as uuidv4 } from 'uuid';
import Product from '@/Models/Product'

export async function POST(request) {

	try {
		await connectToMongoDB();
		const body = await request.json();

		//check if tampering is not done with the cart items
		const { name, email, phone, address, zipCode, state, district, totalAmount, paymentStatus, products } = body;
		for (let item of products) {
			const product = await Product.findById({ _id: item.product_id })
			if (product.price !== item.price) {
				return NextResponse.json({ message: 'some items in your cart has been modified .Please try again', response: false })
			}
		}

		//create the order in database
		const orderId = uuidv4();

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