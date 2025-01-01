import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Options from './Options';
import Modal from './Modal';

const List = ({ title, listId, onEditTitle, onDeleteList }) => {
    const [cards, setCards] = useState([]);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCard, setNewCard] = useState('');
    const [description, setDescription] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);

    const scrollRef = useRef(null);
    const optionsRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(e.target) &&
                !listRef.current.contains(e.target)
            ) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`/api/kanban/card/index/${listId}`);
                setCards(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (listId) {
            fetchCards();
        }
    }, [listId]);

    const handleShowOptions = () => {
        setShowOptions((prevState) => !prevState);
    };

    const handleDelete = () => {
        setModalType('delete');
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setModalType(null);
    };

    const handleModalConfirm = () => {
        if (modalType === 'delete') {
            onDeleteList(listId);
        }
        setIsModalVisible(false);
        setModalType(null);
    };

    const handleTitleDoubleClick = () => onEditTitle(listId, title);

    const handleAddCard = async () => {
        if (newCard.trim() === '') return;

        try {
            const response = await axios.post('/api/kanban/card/post', {
                name: newCard,
                description: description,
                column_id: listId,
            });

            if (response.data.success) {
                setCards((prevCards) => [...prevCards, response.data.card]);
                setNewCard('');
                setDescription('');
                setIsAddingCard(false);

                setTimeout(() => {
                    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    return (
        <div className="list p-4 rounded-lg w-80 bg-white shadow-lg flex flex-col h-fit max-h-[500px]">
            <div
                className="title mb-4 cursor-pointer font-semibold text-lg"
                onDoubleClick={handleTitleDoubleClick}
            >
                <div className="flex justify-between items-center">
                    <h3>{title}</h3>
                    <div>
                        <svg
                            onClick={handleShowOptions}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <Options
                showOptions={showOptions}
                onEdit={handleTitleDoubleClick}
                onDelete={handleDelete}
                optionsRef={optionsRef}
            />
            <div className="cards-container flex-1 overflow-y-auto max-h-[400px] flex flex-col gap-4">
                {cards.map((card, index) => (
                    <div key={index} className="card p-3 bg-gray-100 rounded-lg shadow">
                        {card.name}
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>
            {isAddingCard && (
                <div className="add-card-section flex flex-col gap-3 mt-4">
                    <input
                        type="text"
                        placeholder="Masukan nama Card"
                        value={newCard}
                        onChange={(e) => setNewCard(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                    />
                    <textarea
                        placeholder="Masukan deskripsi (opsional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                    />
                </div>
            )}
            <div className="action-buttons mt-4 flex gap-3">
                {isAddingCard ? (
                    <>
                        <button
                            onClick={handleAddCard}
                            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setIsAddingCard(false)}
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
                    </>
                ) : (
                    <button
                        onClick={() => setIsAddingCard(true)}
                        className="py-2 px-4 bg-transparent font-semibold rounded-lg hover:bg-gray-100 transition"
                    >
                        + Add New Card
                    </button>
                )}
            </div>
            <Modal
                visible={isModalVisible}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
                title={<p className="text-red-500">Yakin untuk menghapus?</p>}
                body="Apakah Anda yakin untuk menghapus? List yang telah terhapus tidak dapat dikembalikan."
                confirmText={<p className="text-red-500">Hapus</p>}
            />
        </div>
    );
};

export default List;
