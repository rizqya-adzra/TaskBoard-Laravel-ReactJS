import React from 'react'

const Button = ({ onClick }) => {
  return (
    <button 
        type='submit'
        onClick={onclick}
        className="py-1 px-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
    >
        
    </button>
  )
}

export default Button