import React, { useRef, useEffect } from 'react';

const AddCard = ({ newCard, setNewCard, description, setDescription, onAddCard, onCancel }) => {
    const inputRef = useRef(null);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAddCard();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                onCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onCancel]);

    return (
        <div
            className="add-card-section flex flex-col gap-3 mt-4"
            ref={inputRef} 
        >
            <input
                type="text"
                placeholder="Masukan nama Card"
                value={newCard}
                onChange={(e) => setNewCard(e.target.value)}
                onKeyPress={handleKeyPress} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            <textarea
                placeholder="Masukan deskripsi (opsional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={handleKeyPress} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            <div className="action-buttons flex gap-3">
                <button
                    onClick={onAddCard}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                >
                    Add
                </button>
                <button
                    onClick={onCancel}
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
    );
};

export default AddCard;
