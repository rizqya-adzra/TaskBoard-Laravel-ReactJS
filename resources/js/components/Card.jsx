import React from 'react';

const Card = ({ card }) => {
    return (
        <div className="card p-3 bg-gray-100 rounded-lg shadow">
            <h4 className="font-semibold text-md mb-2">{card.name}</h4>
            {card.description && <p className="text-sm text-gray-600">{card.description}</p>}
        </div>
    );
};

export default Card;