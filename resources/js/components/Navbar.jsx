import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { showToast } from './ToastNotification';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isActive = (path) => {
        return location.pathname === path ? 'font-bold text-indigo-600 bg-indigo-100' : '';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        showToast('Logout berhasil!');
        navigate('/');
    };

    return (
        <nav className="sticky top-0 border-b shadow z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Task-Flow</span>
                </Link>

                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        onClick={toggleDropdown}
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded={isDropdownOpen ? "true" : "false"}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                    </button>

                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="z-50 absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900">Bonnie Green</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2">
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col font-medium p-2 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link
                                to="/home"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/home')}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/about')}`}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/services')}`}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/pricing"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/pricing')}`}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/contact')}`}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div
                    className={`${
                        isMobileMenuOpen ? 'block' : 'hidden'
                    } absolute left-0 right-0 z-50 bg-white shadow-lg md:hidden mt-2 rounded-lg`}
                >
                    <ul className="flex flex-col p-4 space-y-2">
                        <li>
                            <Link
                                to="/home"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/home')}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/about')}`}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/services')}`}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/pricing"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/pricing')}`}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`block py-2 px-3 rounded hover:bg-indigo-100 ${isActive('/contact')}`}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
