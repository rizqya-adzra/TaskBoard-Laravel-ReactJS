import React, { useState } from 'react';
import axios from 'axios';
import { showToast } from './ToastNotification';

const EditListForm = ({ listId, initialTitle, onEditSuccess, onCancel }) => {
    const [editTitle, setEditTitle] = useState(initialTitle);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (editTitle.trim() === '') {
            showToast('Nama list tidak boleh kosong', 'failed');
            return;
        }

        try {
            const response = await axios.put(`/api/kanban/column/put/${listId}`, {
                name: editTitle,
            });

            if (response.data.data) {
                const updatedList = response.data.data;
                onEditSuccess(updatedList);
                showToast('List berhasil diperbarui', 'success');
            }
        } catch (error) {
            console.error('Error updating list:', error);
            showToast('Gagal memperbarui List, coba lagi', 'failed');
        }
    };

    return (
        <form
            onSubmit={handleEditSubmit}
            className="list p-4 rounded-lg w-80 bg-white shadow-lg flex flex-col h-fit"
        >
            <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                placeholder="Edit list name"
            />
            <div className="flex gap-3">
                <button
                    type="submit"
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                >
                    Save
                </button>
                <button
                    onClick={onCancel}
                    type="button"
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
        </form>
    );
};

export default EditListForm;
