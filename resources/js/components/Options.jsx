import React from 'react';

const Options = ({ showOptions, onEdit, onDelete, optionsRef }) => {
    if (!showOptions) return null;

    return (
        <div
            ref={optionsRef}
            className="absolute right-50 ml-2 z-50 bg-white border shadow-lg rounded-lg"
        >
            <ul className="p-2 space-y-2">
                <li>
                    <button
                        onClick={onEdit}
                        className="w-full px-4 py-2 text-left transition-colors duration-200 rounded cursor-pointer hover:bg-indigo-50"
                    >
                        Edit
                    </button>
                </li>
                <li>
                    <button
                        onClick={onDelete}
                        className="w-full px-4 py-2 text-left text-red-500 transition-colors duration-200 rounded cursor-pointer hover:bg-indigo-50"
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Options;
