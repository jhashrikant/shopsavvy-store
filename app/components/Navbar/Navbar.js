import Link from "next/link";
import fetchNavItems from './Navbarserver';
import MainNav from './MainNav';
import NavbarCart from './NavbarCart';

const Navbar = async () => {

    const response = await fetchNavItems();
    const navItems = response?.navItems

    return (
        <div className=" h-16 flex flex-col md:flex-row md:justify-start justify-center items-center py-5 bg-slate-50 shadow-lg sticky top-0 z-10">
            <div className="logo mx-5  md:mx-5  text-xl text-indigo-500">
                <Link href={"/"}>ShopSavvy</Link>
            </div>
            {/* navbar items */}
            <MainNav navItems={navItems} />
            <NavbarCart />
        </div>
    );
}

export default Navbar;