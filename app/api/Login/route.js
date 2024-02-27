import connectToMongoDB from '@/Database/MongoDB'
import { NextResponse } from 'next/server'
import User from '@/Models/User'
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');



export async function POST(request) {

	try {
		await connectToMongoDB();
		const body = await request.json();
		console.log('body',body)
		const { email, password } = body

		if (!email || !password) {
			return NextResponse.json({ message: "email and password are required to Login", response: false })
		}

		const existingUSer = await User.findOne({ email: email })
		if (!existingUSer) {
			return NextResponse.json({ message: 'Please enter valid email to Login,user not found with this emailId' })
		}

		console.log('line23', existingUSer.password)

		var bytes = CryptoJS.AES.decrypt(existingUSer?.password, process.env.SECRET_KEY);
		var descryptedpassword = bytes.toString(CryptoJS.enc.Utf8);

		console.log('line 26', descryptedpassword)

		if (existingUSer) {
			if (email === existingUSer.email && password === descryptedpassword) {
				var token = jwt.sign({ userid: existingUSer._id }, 'shrikant', { expiresIn: '2d' });
				return NextResponse.json({ message: 'Logged in Successfully', response: true, authToken: token, user: existingUSer.name, userid: existingUSer._id ,email: existingUSer.email})
			} else {
				console.log('wrong credentials')
				return NextResponse.json({ message: 'Error! wrong Credentials', response: false })
			}
		}
	} catch (error) {
		console.log('some error occured')
		return NextResponse.json({ message: error, response: false })
	}
}