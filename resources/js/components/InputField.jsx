import React from 'react'

const InputField = ({ value, onChange, placeholder, onKeyPress }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            className="w-full p-2 border text-sm bg-gray-100 placeholder-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:bg-white"
            placeholder={placeholder}
        />
    )
}

export default InputField
