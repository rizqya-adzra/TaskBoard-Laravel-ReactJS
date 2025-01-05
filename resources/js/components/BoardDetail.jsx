import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';
import ModalDialog from './ModalDialog';
import Tooltip from './Tooltip';

const BoardDetail = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(null)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await axios.get(`/api/board/show/${boardId}`);
                setBoard(response.data.data);
            } catch (error) {
                console.error('Error fetching board data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBoardData();
    }, [boardId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg font-semibold">Loading board...</p>
            </div>
        );
    }

    const formattedDate = new Date(board.created_at).toLocaleDateString("id-ID", {
        hour: 'numeric',
        minute: 'numeric',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const formattedUpdate = new Date(board.updated_at).toLocaleDateString("id-ID", {
        hour: 'numeric',
        minute: 'numeric',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div
            className="h-screen bg-fixed overflow-clip"
            style={{
                background: board.color_code,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
            }}
        >
            <div className="flex flex-col">
                <div className="w-full p-2 flex items-center justify-between bg-white px-10">
                        <Link to="/home" className='flex items-center gap-3 cursor-pointer rounded-lg hover:bg-gray-200 p-1 px-2 transition-all ease-in-out'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                            </svg>
                            Back
                        </Link>
      
                    <div className="text-gray-900 flex items-center gap-4">
                        
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="w-full p-4 flex items-center justify-between bg-gray-100 bg-opacity-50">
                    <div className="text-gray-900 flex items-center gap-4">
                        <h2 className="text-xl font-semibold cursor-pointer" onClick={handleOpenModal}>{board.name}</h2>
                        <div className='flex flex-col'>
                            <span className="text-sm text-gray-500">Dibuat pada: {formattedDate}</span>
                            <span className="text-sm text-gray-500">Terakhir di edit: {formattedUpdate}</span>
                        </div>
                    </div>

                    <div className="text-gray-900 flex items-center gap-4">
                        <Tooltip text={board.user.name}>
                            <img
                                src={board.user.photo ? `/storage/${board.user.photo}` : 'https://via.placeholder.com/150'}
                                alt="User Profile"
                                className="size-8 object-cover rounded-full cursor-pointer hover:ring-2 hover:ring-indigo-300 transition"
                                />
                        </Tooltip>
                        <button className='bg-indigo-500 rounded-lg px-3 py-2 text-white hover:bg-indigo-600 transition-all ease-in-out'>
                            Bagikan
                        </button>
                    </div>
                </div>
                <KanbanBoard boardId={boardId} />
                <ModalDialog
                    title={board.name}
                    description={board.description}
                    buttonText="Close"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    );
};

export default BoardDetail;
