import React from 'react';

const InputField = ({ value, onChange, placeholder, onKeyPress }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={placeholder}
        />
    );
};

export default InputField;
