import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import { showToast } from './ToastNotification';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddList from './AddList';
import EditListForm from './EditListForm';

const KanbanBoard = ({ boardId }) => {
    const [lists, setLists] = useState([]);
    const [editingListId, setEditingListId] = useState(null);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(`/api/kanban/column/index/${boardId}`);
                setLists(response.data.data || []);
            } catch (error) {
                console.error('Error fetching lists:', error);
                showToast('Gagal memuat data list', 'failed');
            }
        };

        if (boardId) fetchLists();
    }, [boardId]);

    const handleAddList = async (title) => {
        try {
            const response = await axios.post('/api/kanban/column/post', {
                name: title,
                board_id: boardId,
            });

            if (response.data.success) {
                setLists((prev) => [...prev, response.data.column]);
                showToast('List berhasil dibuat', 'success');
            } else {
                showToast(response.data.message || 'Gagal membuat List, coba lagi', 'failed');
            }
        } catch (error) {
            console.error('Error adding list:', error);
            showToast('Gagal membuat List, coba lagi', 'failed');
        }
    };

    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const reorderedLists = Array.from(lists);
        const [movedList] = reorderedLists.splice(source.index, 1);
        reorderedLists.splice(destination.index, 0, movedList);
        setLists(reorderedLists);

        const positions = reorderedLists.map((list, index) => ({
            id: list.id,
            position: index,
        }));

        try {
            await axios.put('/api/kanban/column/position/put', { positions });
            showToast('Posisi berhasil diubah', 'success');
        } catch (error) {
            console.error('Error updating positions:', error);
            showToast('Gagal mengubah posisi', 'failed');
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
            <div className="flex gap-6 px-1 w-full">
                <DragDropContext
                    onDragEnd={onDragEnd}
                    draggableId="lists"
                    type="list"
                >
                    <Droppable droppableId="lists" direction="horizontal" type="list">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex gap-6 px-12 w-full"
                            >
                                {lists.length === 0 && (
                                    <AddList onAddList={handleAddList} />
                                )}
                                {lists.map((list, index) => (
                                    <Draggable
                                        key={list.id}
                                        draggableId={`list-${list.id}`}
                                        index={index}
                                        isDragDisabled={editingListId !== null} 
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                <List
                                                    title={editingListId === list.id ? (
                                                        <EditListForm
                                                            listId={list.id}
                                                            initialTitle={list.name}
                                                            onEditSuccess={(updatedList) => {
                                                                setLists((prev) =>
                                                                    prev.map((list) =>
                                                                        list.id === updatedList.id ? updatedList : list
                                                                    )
                                                                );
                                                                setEditingListId(null);
                                                            }}
                                                            onCancel={() => setEditingListId(null)}
                                                        />
                                                    ) : (
                                                        list.name
                                                    )}
                                                    listId={list.id}
                                                    onDeleteList={handleDeleteList}
                                                    onEditTitle={() => {
                                                        setEditingListId(list.id);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {lists.length > 0 && (
                                    <AddList onAddList={handleAddList} />
                                )}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default KanbanBoard;
