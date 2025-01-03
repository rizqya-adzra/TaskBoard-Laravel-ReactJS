import React from 'react';

const CancelButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="p-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center bg-white"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </button>
    );
};

export default CancelButton;
