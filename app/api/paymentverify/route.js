import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
import Payment from '@/Models/Payment'
import connectToMongoDB from "@/Database/MongoDB";
const razorpay = new Razorpay({
	key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
	key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET,
});

export async function POST(req) {

	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
		await req.json();
	const body = razorpay_order_id + "|" + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET)
		.update(body.toString())
		.digest("hex");

	const isAuthentic = expectedSignature === razorpay_signature;


	if (isAuthentic) {
		await connectToMongoDB()
		await Payment.create({
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
		});

		//  return NextResponse.redirect(new URL('/paymentsuccess', req.url));

	} else {
		return NextResponse.json({
			message: "fail"
		}, {
			status: 400,
		})
	}

	return NextResponse.json({
		message: "success"
	}, {
		status: 200,
	})

}
