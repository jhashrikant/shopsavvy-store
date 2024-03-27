'use client';
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {

  const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_BASE_URL_CLIENT : 'http://localhost:3000';

  const [formdata, setformdata] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setloading] = useState(false)

  const handleChange = ({ target }) => {
    setformdata((prevstate) => {
      return {
        ...prevstate,
        [target.name]: target.value
      }
    })
  }

  const handlecancel = () => {
    setformdata({
      name: '',
      email: '',
      message: ''
    });
    return;
  }

  const handleDetailsSubmit = async () => {
    const requiredfields = ["name", "email", "message"];
    const missingfields = requiredfields.filter((field) => !formdata[field])
    if (missingfields.length > 0) {
      toast.error(`Please enter all the valid fields :${missingfields.join(", ")}`);
      return;
    }
    setloading(true)
    try {
      const response = await fetch(`${apiUrl}/api/contactform`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!response?.ok) {
        console.log('error')
        setloading(false)
        return
      }
      const result = await response.json();
      if (result.response) {
        toast.success(result.message)
        setloading(false)
        setformdata({
          name: '',
          email: '',
          message: ''
        });
      }
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Some error occured" || error)
      setloading(false)
    }
  }

  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
          Contact us
        </h3>
        <p className="text-sm text-muted-foreground" />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="first-name"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                value={formdata.name}
                name="name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="first-name"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                value={formdata.email}
                name="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              onChange={handleChange}
              value={formdata.message}
              name="message"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="message"
              placeholder="Enter your message"
            />
          </div>
        </div>
      </div>
      <div className="flex  items-center p-6">
        <button onClick={handlecancel} className="mx-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-stone-200 hover:text-accent-foreground h-10 px-4 py-2">
          Cancel
        </button>
        <button disabled={loading} onClick={handleDetailsSubmit} className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-white  hover:bg-slate-800 h-10 px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? 'Processing' : 'Send message'}
        </button>
      </div>
      <Toaster />
    </div>
  )
}

export default ContactUs;
