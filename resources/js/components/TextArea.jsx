import React from 'react'

const TextArea = ({ value, onChange, placeholder }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className="w-full p-2 text-sm border bg-gray-100 placeholder-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:bg-white"
            placeholder={placeholder}
        />
    )
}

export default TextArea
