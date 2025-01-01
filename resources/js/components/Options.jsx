import React from 'react';

const Options = ({ showOptions, onEdit, onDelete, optionsRef }) => {
    if (!showOptions) return null;

    return (
        <div
            ref={optionsRef}
            className="absolute bg-white shadow-lg rounded-lg z-50 border left-full top-0 ml-2"
        >
            <ul className="space-y-2 p-2">
                <li>
                    <button
                        onClick={onEdit}
                        className="w-full text-left px-4 py-2 cursor-pointer hover:bg-indigo-50 rounded transition-colors duration-200"
                    >
                        Edit
                    </button>
                </li>
                <li>
                    <button
                        onClick={onDelete}
                        className="w-full text-left px-4 py-2 cursor-pointer text-red-500 hover:bg-indigo-50 rounded transition-colors duration-200"
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Options;
