import React from 'react'

const ColorOption = ({ onColorSelect, onClose, position }) => {
    const colors = ['#4A90E2', '#D32F2F', '#FFEB3B', '#43A047', '#E91E63']

    return (
        <div
            className="absolute z-50"
            style={{ top: position?.top, left: position?.left }}
            onClick={onClose}
        >
            <div
                className="rounded-md border-s-8 shadow-lg border-indigo-500 bg-white p-4 space-y-4 w-max"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-semibold text-center">Pilih Warna</h3>
                <div className="flex justify-center space-x-4">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="w-10 h-10 rounded-full cursor-pointer transition-all duration-200" 
                            style={{ backgroundColor: color }}
                            onClick={() => onColorSelect(color)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ColorOption
