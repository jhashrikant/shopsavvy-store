import connectToMongoDB from "@/Database/MongoDB"
import { NextResponse } from "next/server"
import ContactForm from '@/Models/ContactformEntry'

export async function POST(request) {
  try {
    await connectToMongoDB();
    const { name, email, message } = await request.json()
    const contactus = await ContactForm({
      name,
      email,
      message
    })
    await contactus.save()
    return NextResponse.json({ message: 'Your enquiry form has been submitted', response: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Some error occured",error, response: false })
  }
}