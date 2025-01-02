import React, { useState, useRef, useEffect } from 'react';

const AddList = ({ onAddList }) => {
    const [newListTitle, setNewListTitle] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const inputRef = useRef(null);

    const handleAddClick = () => {
        if (!newListTitle.trim()) {
            alert('Nama List tidak boleh kosong');
            return;
        }
        onAddList(newListTitle);
        setNewListTitle('');
        setIsAdding(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddClick();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsAdding(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="rounded-lg w-80 flex flex-col flex-wrap">
            {isAdding ? (
                <div
                    className="list p-4 rounded-lg w-80 bg-white shadow-lg flex flex-col h-fit"
                    ref={inputRef}
                >
                    <input
                        type="text"
                        placeholder="Enter list name"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-3"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={handleAddClick}
                            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition flex items-center justify-center bg-white"
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
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="py-2 px-4 mx-5 bg-white bg-opacity-70 font-semibold border rounded-lg hover:bg-blue-100 transition"
                >
                    + Add New List
                </button>
            )}
        </div>
    );
};

export default AddList;
