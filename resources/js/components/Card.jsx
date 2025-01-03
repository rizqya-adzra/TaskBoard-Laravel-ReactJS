import React from 'react';

const Card = ({ card }) => {
    const description = card.description && card.description.length > 50
        ? `${card.description.slice(0, 50)}...`
        : card.description || '';

    return (
        <div className="card p-3 bg-gray-100 rounded-lg shadow">
            <h4 className="font-semibold text-md mb-2 truncate">{card.name}</h4>
            <p className="text-sm text-gray-600 break-words">{description}</p>
        </div>
    );
};

export default Card;
