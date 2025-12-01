import React from 'react';
import { Link } from 'react-router-dom';

import { User, Settings, LogOut, Search } from "lucide-react";

import {useDispatch , useSelector} from "react-redux"

import { userLogout } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
const UserNavbar = () => {

    const dispatch = useDispatch();

    const profileItems = [
        { name: 'Profile', to: '/profile', Icon: User },
        { name: 'Settings', to: '/settings', Icon: Settings },
        { name: 'Logout', to: '/logout', Icon: LogOut }
    ];

    const handle = (name)=>{
        
        if(name === "Logout"){

            dispatch(userLogout())
                .then((response)=>{
                    console.log(response)
                    if(response.payload.success){
                        toast.success("Logged out successfully!");
                    }
                })
        }
    }

    return (
        <nav className="w-full bg-background/95 shadow-sm mb-3">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-text font-semibold text-2xl">Paper Insight</Link>
                    </div>

                    {/* <div className="flex-1 mx-6 px-10 hidden md:flex items-center">
                        <div className="relative w-full max-w-lg">
                            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text/60">
                                <Search size={18} />
                            </span>
                            <input
                                type="search"
                                placeholder="Search papers, topics or authors"
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-text/10 bg-[#C5C7BC] text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
                            />
                        </div>
                    </div> */}

                    <div className="flex items-center gap-4">
                        {/* small search on mobile */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-full hover:bg-text/5">
                                <Search size={18} color="black" />
                            </button>
                        </div>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full overflow-hidden">
                                    <img
                                        alt="User avatar"
                                        src="https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content bg-background rounded-box w-56 p-2 shadow">
                                {profileItems.map((item, idx) => (
                                    <li key={idx}>
                                        <Link to={item.to} className="flex items-center gap-3 px-2 py-2 hover:bg-text/5 rounded" onClick ={()=>handle(item.name)}>
                                            <item.Icon size={18} color="black" />
                                            <span className="text-text">{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
