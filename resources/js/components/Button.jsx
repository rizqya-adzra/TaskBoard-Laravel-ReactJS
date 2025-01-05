import React from 'react'

const Button = ({ onClick, buttonName }) => {
  return (
    <button 
      type="submit"
        onClick={onClick}
        className="py-1 px-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
    >
        {buttonName}
    </button>
  )
}

export default Button