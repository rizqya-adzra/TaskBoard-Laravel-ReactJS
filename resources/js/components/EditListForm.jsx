import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { showToast } from './ToastNotification';
import InputField from './InputField';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';

const EditListForm = ({ listId, initialTitle, onEditSuccess, onCancel }) => {
    const [editTitle, setEditTitle] = useState(initialTitle);
    const inputRef = useRef(null);

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
        <form
            onSubmit={handleEditSubmit}
            className="flex flex-col"
            ref={inputRef} 
        >
            <InputField
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Edit list name"
            />
            <div className="flex gap-3 mt-3">
                <SaveButton onClick={handleEditSubmit} buttonName='Simpan' />
                <CancelButton onClick={onCancel} />
            </div>
        </form>
    );
};

export default EditListForm;
