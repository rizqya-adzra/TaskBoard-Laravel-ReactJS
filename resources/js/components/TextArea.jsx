import React from 'react'

const TextArea = ({ value, onChange, placeholder }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={placeholder}
        />
    )
}

export default TextArea
