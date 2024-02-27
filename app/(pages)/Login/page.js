'use client'
import Authreducer from "@/app/Reducers/AuthReducer"
import Link from "next/link"
import { useReducer } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/app/context/Authcontext";

const Login = () => {

	const { authState, authDispatch } = useAuthContext()
	const { isAuthenticated ,user} = authState

	const router = useRouter();

	const intitialstate = {
		email: '',
		password: ''
	}

	const [formData, dispatch] = useReducer(Authreducer, intitialstate);

	function handlechange(event) {
		dispatch({
			type: 'CHANGE',
			payload: {
				field: event.target.name,
				value: event.target.value
			}
		})
	}


	const handleformSubmit = async (event) => {
		event.preventDefault();
		console.log('line 22', formData)
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL_CLIENT}/api/Login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
			if (!response.ok) {
				toast.error("some error occured , we didnt get response from server")
				return;
			}
			const data = await response.json();
			console.log(data)
			console.log(data.authToken)
			if (!data.response) {
				toast.error(data.message)
				return;
			} else {
				console.log('line asasa',data.user)
				console.log('userid',data.userid)
				router.push('/')
				
				alert(`welcome ${data.user}`)
				toast.success('Logged In successfully');
				authDispatch({
					type: 'LOGIN_SUCCESS'
				})
				authDispatch({
					type:'USER',
					payload: data?.user
				})
				localStorage.setItem('email',data?.email)
				localStorage.setItem('user',data?.user)
				console.log(isAuthenticated)
				localStorage.setItem('authToken', data?.authToken)
			}
			dispatch({
				type: 'RESET',
				payload: intitialstate
			})
		} catch (error) {
			console.error('some error occured',error);
			toast.error(error)
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="font-bold">Shopsavvy</h2>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">LogIn to your account</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleformSubmit} className="space-y-6" >
					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
						<div className="mt-2">
							<input value={formData.email} onChange={handlechange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
							<input value={formData.password} onChange={handlechange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Login</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Dont have a Account?
					<Link href="/Signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create account</Link>
				</p>
			</div>
			<Toaster />
		</div>
	)
}
export default Login
