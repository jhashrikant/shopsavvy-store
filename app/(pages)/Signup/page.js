'use client';
import Authreducer from "@/app/Reducers/AuthReducer";
import Link from "next/link"
import { useReducer, useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import { useAuthContext } from "@/app/context/Authcontext";
import { useRouter } from "next/navigation";


const Signup = () => {

	const [Loading, setloading] = useState(false)

	const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_BASE_URL_CLIENT : 'http://localhost:3000';

	const router = useRouter()

	const { authState, authDispatch } = useAuthContext()

	const intitialstate = {
		name: '',
		email: '',
		password: ''
	}

	const [formData, dispatch] = useReducer(Authreducer, intitialstate)

	function handlechange(event) {
		dispatch({
			type: 'CHANGE',
			payload: {
				field: event.target.name,
				value: event.target.value
			}
		})
	}

	const handlesubmit = async (event) => {
		setloading(true)
		event.preventDefault()
		try {
			const response = await fetch(`${apiUrl}/api/Signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			console.log('line 35', response)

			if (!response.ok) {
				toast.error("Failed to submit form. Status: " + response.status)
				return
			}
			const result = await response.json()
			console.log(result)
			if (!result.response) {
				console.error(result.message)
				toast.error(result.message)
				return;
			} else {
				toast.success(result.message)
				setloading(false)
				router.push('/Login')
			}
			dispatch({
				type: 'RESET',
				payload: intitialstate
			})
		} catch (error) {
			console.log('some error occured')
			toast.error(error.message || "An unexpected error occurred.")
			setloading(false)
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="font-bold">Shopsavvy</h2>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Account</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handlesubmit} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
						<div className="mt-2">
							<input value={formData?.name} onChange={handlechange} id="name" name="name" type="text" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
						<div className="mt-2">
							<input value={formData?.email} onChange={handlechange} id="email" name="email" type="email" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
							<div className="text-sm">
								<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
							</div>
						</div>
						<div className="mt-2">
							<input value={formData?.password} onChange={handlechange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<button disabled={Loading} type="submit" className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}>{Loading ? 'Creating Account...' : 'Create Account'}</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Have a Account ?
					<Link href="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
				</p>
			</div >
			<Toaster />
		</div >
	)
}


export default Signup
