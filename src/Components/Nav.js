import React, { useState } from 'react';
import { NavLink, } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


const navstyle={
    margin:"0.8rem",
   
    color:"white",
    font:"bold",
}
const submenu={
    fontSize:"0.9rem",
    hover:"black",
    font:"bold"
}
const NavLinks = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toogleNavUser = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
             
            <NavLink className="relative " style={navstyle}  onClick={toogleNavUser}>Lodge Complaint
            {isOpen && (
                <div className=' absolute flex flex-col items-center basis-full mt-2 p-4  bg-blue-500 shadow-lg   '>
                <NavLink className="mt-2 hover:text-black" style={submenu} to="/Main">Add Complaint</NavLink>
                <NavLink className="mt-3  hover:text-black"style={submenu}>Delete Complaint</NavLink>
                <NavLink className="mt-3  hover:text-black"style={submenu}>Modify Complaint</NavLink>
                </div>
            )}
            </NavLink>
            <NavLink style={navstyle} className="hover:text-black"to="/Status">Status</NavLink>
            <NavLink style={navstyle} className="hover:text-black" to="/Summary">Summary</NavLink>
            <NavLink style={navstyle} className="hover:text-black" to="/Profile">Profile</NavLink>
        </>
    )
}

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toogleNavUser = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className='bg-[#055C9D] sticky top-0 z-[20] items-center justify-between p-8 flex-wrap mx-auto flex w-full'>
                <div className='bg-[#055C9D]  py-3' >
                    <img className="m-0 md:object-none px-5" src='/Images/drdo_logo.png' alt='logo' />
                </div>
                <nav className='flex w-1/3 justify-end '>
                    <div></div>
                    <div className='hidden lg:flex w-full justify-between  '>
                        <NavLinks />
                    </div>
                    <div className='lg:hidden'>
                        <button onClick={toogleNavUser}>
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </nav>
                {isOpen && (
                    <div className='flex flex-col items-center basis-full ' >
                        <NavLinks/>
                    </div>
                )}
            </header>

        </>
    )

}
export default Nav