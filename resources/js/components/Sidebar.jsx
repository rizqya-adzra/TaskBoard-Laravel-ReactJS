import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-100 p-6 flex-col">
            <div className="text-2xl font-semibold">
                UserName
            </div>
            <div className="space-y-1 w-full mt-6">
                <Link
                    to="/boards"
                    className="flex items-center px-3 py-2 gap-2 text-md rounded-lg hover:bg-indigo-100 transition-all duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    Boards
                </Link>
                <Link
                    to="/home"
                    className="flex items-center px-3 py-2 rounded-lg gap-2 text-md hover:bg-indigo-100 transition-all duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Home
                </Link>
                <Link
                    to="/highlights"
                    className="flex items-center px-3 py-2 rounded-lg gap-2 text-md hover:bg-indigo-100 transition-all duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    Highlights
                </Link>
            </div>
            <hr className="border-t border-gray-400 my-7" />
            <div className="mt-auto">
                <a href="#" className="block text-sm rounded-lg gap-2 px-2 py-1 hover:bg-indigo-100 transition-all duration-300 ease-in-out">Settings</a>
                <a href="#" className="block text-sm rounded-lg gap-2 px-2 py-1 hover:bg-indigo-100 transition-all duration-300 ease-in-out">Logout</a>
            </div>
        </div>
    )
}

export default Sidebar
