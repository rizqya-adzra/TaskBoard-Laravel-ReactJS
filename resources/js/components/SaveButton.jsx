import React from 'react'

const SaveButton = ({ onClick, buttonName }) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className="py-1 px-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
        >
            {buttonName}
        </button>
    )
}

export default SaveButton
