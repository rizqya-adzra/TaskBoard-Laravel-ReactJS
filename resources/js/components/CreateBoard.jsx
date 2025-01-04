import React, { useState } from 'react'
import CreateBoardModal from './CreateBoardModal'

const CreateBoard = ({ onBoardCreated }) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }
    return (
        <div>
            <a
                onClick={handleOpenModal}
                className="cursor-pointer w-40 mx-auto rounded-lg flex justify-center items-center h-36 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 ease-in-out">
                <h5 className="text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </h5>
            </a>

            <CreateBoardModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onBoardCreated={onBoardCreated}
            />
        </div>
    )
}

export default CreateBoard