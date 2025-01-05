import React from 'react'

const Label = ({ labelName, htmlFor = '' }) => {
    return (
        <div className="mb-2">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-gray-700"
            >
                {labelName}
            </label>
        </div>
    )}
    
export default Label