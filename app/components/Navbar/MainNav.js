'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from "next/link";
import { Menu } from 'lucide-react';
import { XCircle } from 'lucide-react';
import styles from '/styles/Navbar.module.css';
import { useAuthContext } from "@/app/context/Authcontext";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { CircleUserRound } from 'lucide-react';

const MainNav = ({ navItems }) => {

    const router = useRouter()

    const [active, setactive] = useState(false)

    const { authState, authDispatch } = useAuthContext()

    const { isAuthenticated, user } = authState

    const [isNavVisible, setIsNavVisible] = useState(false);
    const navRef = useRef()

    const profileDropdownref = useRef()

    function openAndCloseHamburger() {
        setIsNavVisible(prevIsNavVisible => !prevIsNavVisible);
    }

    function toggleActive() {
        setactive(prevIsactive => !prevIsactive)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && event && !navRef.current.contains(event.target)) {
                setIsNavVisible(false);
            }
            if (profileDropdownref.current && event && !profileDropdownref.current.contains(event.target)) {
                // console.log(profileDropdownref.current.contains(event.target))
                setactive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [navRef, profileDropdownref])

    const handleLogout = async () => {
        authDispatch({
            type: 'LOGOUT',
        })
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        toast.success("Logged out")
        router.push('/Login');
    }


    return (

        <>
            <Menu onClick={openAndCloseHamburger} className={styles.hamburger} />

            <nav ref={navRef}>
                {isNavVisible && <XCircle className={styles.closeIcon} onClick={openAndCloseHamburger} />}
                <ul className={`${styles.navItems} ${isNavVisible ? styles.visible : ''}`}>
                    {navItems?.map((navitem, index) => (
                        <li onClick={() => isNavVisible ? setIsNavVisible(prev => !prev) : null} className='hover:cursor-pointer mx-2 py-3' key={navitem._id}>
                            <Link key={index} href={`/Category/${navitem.labelname}`}>{navitem.labelname}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {!isAuthenticated ?
                (
                    <button className="flex mr-2 absolute right-14 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                        <Link href="/Login">Login</Link>
                    </button>
                )
                :
                <>
                    {/* <button onClick={handleLogout} className="flex mr-2 absolute right-14  border-0 py-2 px-3 focus:outline-none  rounded text-sm"><CircleUserRound /></button> */}
                    <div ref={profileDropdownref} className="flex mr-2 absolute right-14  border-0 py-2 px-3 focus:outline-none  rounded text-smt">
                        <div>
                            <button onClick={toggleActive} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 " id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <CircleUserRound />
                            </button>
                        </div>


                        {active && <div className="top-10 absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <div>Welcome {user}</div>
                                <Link href="/Profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Profile</Link>
                                <Link href="/MyOrders" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">My Orders</Link>
                                <button onClick={handleLogout} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Logout</button>
                            </div>
                        </div>}
                    </div>
                </>
            }
            <Toaster />
        </>
    )
}
export default MainNav
