import React, { useState } from 'react';
import NavbarImage from "../../assets/Background Rem.png"
import { NavLink, Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [

        {
            name: "About",
            path: "/#about"
        },
        {
            name: "Features",
            path: "/#features"
        },
        {
            name: "Login",
            path: "/login"
        },
        {
            name: "Get Started",
            path: "/register"
        }
    ]

    const navigate = useNavigate();

   

    return (
        <nav className='border-b border-text/10 sticky top-0 z-50 backdrop-blur-sm bg-background/95'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                <div className='flex items-center justify-between h-20'>

                    {/* Logo Section */}
                    <Link to="/#" className='flex items-center gap-3 group'>
                        <div className='w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-2 ring-text/5 group-hover:ring-text/20 transition-all duration-300'>
                            <img
                                src={NavbarImage}
                                alt="Paper Insight Logo"
                                className='w-full h-full object-contain object-center transform scale-125 group-hover:scale-150 transition-transform duration-300'
                            />
                        </div>
                        <span className='font-inter font-bold text-3xl text-text hidden sm:block tracking-tight'>
                            Paper Insight
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-10'>
                        {navItems.slice(0, 2).map((item, idx) => {
                            // If the nav item is a hash link (/#about), render a plain anchor
                            if (item.path && item.path.includes('#')) {
                                const hash = item.path.split('#')[1] ? `#${item.path.split('#')[1]}` : item.path;
                                return (
                                    <a
                                        href={hash}
                                        key={idx}
                                        className={`font-inter font-semibold text-base transition-all duration-300 relative group/link text-text/60 hover:text-text`}
                                    >
                                        {item.name}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-text transition-all duration-300 w-0 group-hover/link:w-full`}></span>
                                    </a>
                                );
                            }

                            return (
                                <NavLink
                                    to={item.path}
                                    key={idx}
                                    className={({ isActive }) =>
                                        `font-inter font-semibold text-base transition-all duration-300 relative group/link ${isActive
                                            ? 'text-text'
                                            : 'text-text/60 hover:text-text'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {item.name}
                                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-text transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover/link:w-full'
                                                }`}></span>
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}

                        <div className='flex items-center gap-4 ml-4'>
                            <NavLink
                                to="/login"
                                className='font-inter font-semibold text-base text-text/70 hover:text-text transition-all duration-300 px-5 py-2.5 rounded-xl hover:bg-text/5'
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className='font-inter font-bold text-base text-background bg-text hover:bg-text/90 transition-all duration-300 px-7 py-2.5 rounded-xl shadow-lg shadow-text/20 hover:shadow-xl hover:shadow-text/30 hover:-translate-y-0.5'
                            >
                                Get Started
                            </NavLink>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='md:hidden p-2.5 rounded-xl hover:bg-text/5 transition-all duration-300'
                        aria-label='Toggle menu'
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}>
                    <div className='flex flex-col gap-2 pt-4 border-t border-text/10'>
                        {navItems.map((item, idx) => {
                            // Mobile menu: if hash link, render anchor and close menu
                            if (item.path && item.path.includes('#')) {
                                const hash = item.path.split('#')[1] ? `#${item.path.split('#')[1]}` : item.path;
                                return (
                                    <a
                                        href={hash}
                                        key={idx}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`font-inter font-semibold text-base px-5 py-3.5 rounded-xl transition-all duration-300 ${item.name === 'Get Started'
                                            ? 'bg-text text-background hover:bg-text/90 shadow-lg shadow-text/20 mt-2'
                                            : 'text-text/60 hover:bg-text/5 hover:text-text'
                                            }`}
                                    >
                                        {item.name}
                                    </a>
                                );
                            }

                            return (
                                <NavLink
                                    to={item.path}
                                    key={idx}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `font-inter font-semibold text-base px-5 py-3.5 rounded-xl transition-all duration-300 ${item.name === 'Get Started'
                                            ? 'bg-text text-background hover:bg-text/90 shadow-lg shadow-text/20 mt-2'
                                            : isActive
                                                ? 'text-text bg-text/10'
                                                : 'text-text/60 hover:bg-text/5 hover:text-text'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;