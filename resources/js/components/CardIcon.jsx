import React from 'react';

const DeleteIcon = ({ name, svg, onClick }) => {
    return (
        <div onClick={onClick} className='flex min-w-[20vh] text-sm items-center gap-2 cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-300'>
            {svg}
            <p>{name}</p>
        </div>
    );
};

export default DeleteIcon;
