import React, { useState } from 'react';
import ModalDynamic from './ModalDynamic';

const Card = ({ card }) => {
    const [isModalDynamicVisible, setIsModalDynamicVisible] = useState(false);

    const handleModalClose = () => {
        setIsModalDynamicVisible(false)
    }

    const formattedDate = new Date(card.created_at).toLocaleDateString("id-ID", {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    
    const description = card.description && card.description.length > 50
        ? `${card.description.slice(0, 50)}...`
        : card.description || '';

    const handleOnClick = (e) => {
        e.preventDefault()
        setIsModalDynamicVisible(true)
    }

    return (
        <div className="card p-3 bg-gray-100 rounded-lg shadow" 
            onClick={handleOnClick}>
            <h4 className="font-semibold text-md mb-2 truncate">{card.name}</h4>
            <p className="text-sm text-gray-600 break-words">{description}</p>
            <ModalDynamic 
                visible={isModalDynamicVisible}
                title={card.name}
                subTitle={formattedDate}
                name1='Warna'
                name2='Gabung'
                onClose={handleModalClose}
            />
        </div>

    );
};

export default Card;
