import './globals.css'
import { Inter } from 'next/font/google'
import Productprovider from './context/Productcontext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AuthProvider from './context/Authcontext'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'ShopSavvy',
	description: 'shopsavvy',
}

export default async function RootLayout({ children }) {

	return (
		<>
			<html lang="en">
				<body className={inter.className}>
					<AuthProvider>
						<Productprovider>
							<Navbar />
							{children}
							<Footer />
						</Productprovider>
					</AuthProvider>
				</body>
			</html>
			<Script src="https://checkout.razorpay.com/v1/checkout.js"
			/>
		</>
	)
}
