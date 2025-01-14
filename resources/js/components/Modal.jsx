import React from 'react';

const Modal = ({ visible, onClose, onConfirm, title, body, confirmText }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="py-4">
                    {body}
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-all"
                        onClick={onClose}
                    >
                        Batal
                    </button>
                    <button
                        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
