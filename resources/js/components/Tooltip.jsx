import React from 'react'

const Tooltip = ({ text, children }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-gray-700 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {text}
            </div>
        </div>
    )
}

export default Tooltip
