import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
import User from '@/Models/User'
import CryptoJS from "crypto-js";

export async function POST(request) {
  
    try {
        await connectToMongoDB()
        const body = await request.json();
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Pls enter credentials to create Account', response: false })
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return NextResponse.json({ message: 'User with that email already exists. Use different email id', response: false })
        }
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

        const userdata = new User({
            name: name,
            email: email,
            password: encryptedPassword
        })
        await userdata.save();
        return NextResponse.json({ message: 'Account created successfully', response: true })

    } catch (error) {
        console.error('Error while adding user:', error);
        return NextResponse.json({ message: error, response: false })
    }
}