import React, { useState } from "react";

const DropdownMenu = ({ items, onSelect, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (onSelect) {
            onSelect(item);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleToggle}
                className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                {selectedItem ? selectedItem.label : name} ▼
            </button>
            {isOpen && (
                <ul className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                    {items.map((item) => (
                        <li
                            key={item.value}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
