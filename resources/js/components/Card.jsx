import React, { useState } from 'react'
import ModalDynamic from './ModalDynamic'

const Card = ({ card, positionOptions, refreshCards }) => {
    const [isModalDynamicVisible, setIsModalDynamicVisible] = useState(false)
    const [selectedPosition, setSelectedPosition] = useState(card.position)

    const handleOnClick = () => {
        setIsModalDynamicVisible(true)
    }

    const handleModalClose = () => {
        setIsModalDynamicVisible(false)
    }

    const handlePositionChange = (newPosition) => {
        setSelectedPosition(newPosition)
    }

    const formattedDate = new Date(card.created_at).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })

    const description =
        card.description && card.description.length > 50
            ? `${card.description.slice(0, 50)}...`
            : card.description || ''

    return (
        <div
            className="card p-3 border-b bg-gray-100 rounded-lg shadow hover:border-2 cursor-pointer"
            onClick={handleOnClick}
            style={card.color ? { borderTop: `2vh solid ${card.color}` } : {}}
        >
            <h4 className="font-semibold text-md mb-2 truncate">{card.name}</h4>
            <p className="text-sm text-gray-600 break-words list-disc list-inside" dangerouslySetInnerHTML={{ __html: description }} />

            <ModalDynamic
                visible={isModalDynamicVisible}
                placeholderName={card.name}
                placeholderDesc={card.description}
                placeholderColor={card.color}
                cardId={card.id}
                title={card.name}
                subTitle={formattedDate}
                positionOptions={positionOptions}
                initialPosition={selectedPosition}
                handlePositionChange={handlePositionChange}
                refreshCards={refreshCards}
                onClose={handleModalClose}
                cardColor={card.color}
                name1="Warna"
                name2="Gabung"
                name3="Hapus"
            />
        </div>
    )
}


export default Card
