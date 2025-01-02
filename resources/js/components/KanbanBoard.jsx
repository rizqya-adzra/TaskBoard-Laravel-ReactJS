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

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const reorderedLists = Array.from(lists);
        const [movedList] = reorderedLists.splice(source.index, 1);
        reorderedLists.splice(destination.index, 0, movedList);

        setLists(reorderedLists);
    };

    return (
        <div className="flex mt-10 h-screen overflow-x-auto">
            <div className="flex gap-6 px-12 w-full">
                <DragDropContext onDragEnd={onDragEnd}>
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
                                        draggableId={list.id.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {editingListId === list.id ? (
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
                                                    <List
                                                        title={list.name}
                                                        listId={list.id}
                                                        onDeleteList={(id) =>
                                                            setLists((prev) =>
                                                                prev.filter((list) => list.id !== id)
                                                            )
                                                        }
                                                        onEditTitle={() => {
                                                            setEditingListId(list.id);
                                                        }}
                                                    />
                                                )}
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
