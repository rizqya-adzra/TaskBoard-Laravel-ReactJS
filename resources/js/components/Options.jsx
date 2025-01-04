import React from 'react';

const Options = ({ showOptions, onEdit, onDelete, optionsRef, onClose }) => {
    if (!showOptions) return null;

    const handleEdit = () => {
        onEdit();
        onClose();
    };

    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <div
            ref={optionsRef}
            className="absolute z-50 bg-white border shadow-lg rounded-lg"
        >
            <ul className="p-2">
                <li>
                    <button
                        onClick={handleEdit}
                        className="w-full px-4 py-2 text-left transition-colors duration-200 rounded cursor-pointer hover:bg-indigo-50"
                    >
                        Edit
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleDelete}
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
