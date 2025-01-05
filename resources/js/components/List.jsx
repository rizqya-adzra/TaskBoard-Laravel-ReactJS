import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Options from './Options'
import Modal from './Modal'
import Card from './Card'
import AddCard from './AddCard'
import AddNewButton from './AddNewButton'
import { showToast } from './ToastNotification'

const List = ({ title, listId, onEditTitle, onDeleteList }) => {
    const [cards, setCards] = useState([])
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [newCard, setNewCard] = useState('')
    const [description, setDescription] = useState('')
    const [showOptions, setShowOptions] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null)

    const scrollRef = useRef(null)
    const optionsRef = useRef(null)

    const refreshCards = async () => {
        try {
            const response = await axios.get(`/api/kanban/card/index/${listId}`)
            if (response.data && response.data.data) {
                setCards(response.data.data) 
            }
        } catch (error) {
            console.error('Error refreshing cards:', error)
        }
    }

    const handlePositionChange = (cardId, newPosition) => {
        const updatedCards = [...cards]
        const cardToMove = updatedCards.find(card => card.id === cardId)

        if (cardToMove) {
            const currentPosition = cardToMove.position

            updatedCards.splice(updatedCards.indexOf(cardToMove), 1)

            updatedCards.forEach((card) => {
                if (card.position >= newPosition && card.position < currentPosition) {
                    card.position += 1
                } else if (card.position <= newPosition && card.position > currentPosition) {
                    card.position -= 1
                }
            })

            cardToMove.position = newPosition

            updatedCards.push(cardToMove)
            updatedCards.sort((a, b) => a.position - b.position)

            setCards(updatedCards)
        }
    }

    const positionOptions = cards.map((_, index) => ({
        value: index + 1,
        label: `Posisi ${index + 1}`,
    }))

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`/api/kanban/card/index/${listId}`)
                if (response.data && response.data.data) {
                    setCards(response.data.data)
                } else {
                    console.error("Response data structure is not correct.")
                }
            } catch (error) {
                console.error("Error fetching cards:", error)
            }
        }

        if (listId) fetchCards()
    }, [listId])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleTitleDoubleClick = () => onEditTitle(listId, title)

    const handleAddCard = async () => {
        if (!newCard.trim()) {
            showToast('Nama card tidak boleh kosong', 'failed')
            return
        }
        try {
            const response = await axios.post('/api/kanban/card/post', {
                name: newCard,
                description,
                column_id: listId,
            })

            if (response.data.success) {
                setCards((prevCards) => [...prevCards, response.data.card])
                setNewCard('')
                setDescription('')
                setIsAddingCard(false)

                setTimeout(() => {
                    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        } catch (error) {
            console.error('Error adding card:', error)
        }
    }

    const handleDelete = () => {
        setModalType('delete')
        setIsModalVisible(true)
    }

    const handleModalClose = () => {
        setIsModalVisible(false)
        setModalType(null)
    }

    const handleModalConfirm = () => {
        if (modalType === 'delete') onDeleteList(listId)
        handleModalClose()
    }

    const closeOption = () => {
        setShowOptions(false)
    }

    return (
        <div className="p-4 rounded-lg w-80 bg-white shadow-lg flex flex-col">
            <div
                className="title mb-4 cursor-pointer font-semibold text-lg"
                onDoubleClick={handleTitleDoubleClick}
            >
                <div className="flex justify-between items-center">
                    <h3>{title}</h3>
                    <svg
                        onClick={() => setShowOptions((prevState) => !prevState)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 cursor-pointer hover:text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
            </div>
            <Options
                showOptions={showOptions}
                onEdit={handleTitleDoubleClick}
                onDelete={handleDelete}
                optionsRef={optionsRef}
                onClose={closeOption}
            />
            <div className="cards-container flex-1 overflow-y-auto max-h-[45vh] flex flex-col gap-4">
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        card={{ ...card, position: index + 1 }}
                        refreshCards={refreshCards}
                        positionOptions={positionOptions}
                        handlePositionChange={handlePositionChange}
                    />
                ))}
            </div>
            {isAddingCard ? (
                <AddCard
                    newCard={newCard}
                    setNewCard={setNewCard}
                    description={description}
                    setDescription={setDescription}
                    onAddCard={handleAddCard}
                    onCancel={() => setIsAddingCard(false)}
                />
            ) : (
                <div className="mt-4">
                    <AddNewButton
                        onClick={() => setIsAddingCard(true)}
                        AddName="Tambah Card baru +"
                    />
                </div>
            )}
            <Modal
                visible={isModalVisible}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
                title={<p className="text-red-500">Yakin untuk menghapus?</p>}
                body="Apakah Anda yakin untuk menghapus? List yang telah terhapus tidak dapat dikembalikan."
                confirmText={<p>Hapus</p>}
            />
        </div>
    )
}

export default List
