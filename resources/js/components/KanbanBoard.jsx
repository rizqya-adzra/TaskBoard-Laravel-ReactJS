import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import { showToast } from './ToastNotification';

const KanbanBoard = ({ boardId }) => {
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState('');
    const [isAddingList, setIsAddingList] = useState(false);
    const [editingListId, setEditingListId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(`/api/kanban/column/index/${boardId}`);
                setLists(response.data.data);
            } catch (error) {
                console.error('Error fetching lists:', error);
                showToast('Gagal memuat data list', 'failed');
            }
        };

        if (boardId) {
            fetchLists();
        }
    }, [boardId]);

    const handleAddList = async (e) => {
        e.preventDefault();
        if (newListTitle.trim() === '') {
            showToast('Nama List tidak boleh kosong', 'failed');
            return;
        }

        try {
            const response = await axios.post('/api/kanban/column/post', {
                name: newListTitle,
                board_id: boardId,
            });

            if (response.data.success) {
                setLists([...lists, response.data.column]);
                showToast('List berhasil dibuat', 'success');
                setNewListTitle('');
                setIsAddingList(false);
            } else {
                showToast(response.data.message || 'Gagal membuat List, coba lagi', 'failed');
            }
        } catch (error) {
            console.error('Error adding list:', error);
            showToast('Gagal membuat List, coba lagi', 'failed');
        }
    };

    const handleCancelAddList = () => {
        setNewListTitle('');
        setIsAddingList(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (editTitle.trim() === '') {
            showToast('Nama list tidak boleh kosong', 'failed');
            return;
        }

        try {
            const response = await axios.put(`/api/kanban/column/put/${editingListId}`, {
                name: editTitle,
            });

            if (response.data.data) {
                const updatedList = response.data.data;
                setLists(lists.map((list) => (list.id === updatedList.id ? updatedList : list)));
                setEditingListId(null);
                setEditTitle('');
                showToast('List berhasil diperbarui', 'success');
            }
        } catch (error) {
            console.error('Error updating list:', error);
            showToast('Gagal memperbarui List, coba lagi', 'failed');
        }
    };

    const handleDeleteList = async (listId) => {
        try {
            const response = await axios.delete(`/api/kanban/column/delete/${listId}`);
            if (response.data.success) {
                setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
                showToast(response.data.message);
            } else {
                showToast(response.data.message || 'Gagal menghapus List', 'failed');
            }
        } catch (error) {
            console.error('Error deleting list:', error);
            showToast('Gagal menghapus List, coba lagi', 'failed');
        }
    };

    return (
        <div className="flex mt-10 h-screen overflow-x-auto">
            <div className="flex gap-6 px-12 w-full">
                {lists.map((list) => (
                    <div key={list.id} className="relative">
                        {editingListId === list.id ? (
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
                                        onClick={() => setEditingListId(null)}
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
                        ) : (
                            <List
                                title={list.name}
                                listId={list.id}
                                onDeleteList={handleDeleteList}
                                onEditTitle={() => {
                                    setEditingListId(list.id);
                                    setEditTitle(list.name);
                                }}
                            />
                        )}
                    </div>
                ))}
                <div className="rounded-lg w-80 flex flex-col flex-wrap">
                    {isAddingList ? (
                        <div className="list p-4 rounded-lg w-80 bg-white shadow-lg flex flex-col h-fit">
                            <input
                                type="text"
                                placeholder="Enter list name"
                                value={newListTitle}
                                onChange={(e) => setNewListTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-3"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddList}
                                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={handleCancelAddList}
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
                            onClick={() => setIsAddingList(true)}
                            className="py-2 px-4 mx-5 bg-white bg-opacity-70 font-semibold border rounded-lg hover:bg-blue-100 transition"
                        >
                            + Add New List
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KanbanBoard;
