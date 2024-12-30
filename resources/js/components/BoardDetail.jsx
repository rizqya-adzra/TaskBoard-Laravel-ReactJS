import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BoardHeader = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await axios.get(`/api/board/show/${boardId}`);
                setBoard(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching board data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBoardData();
    }, [boardId]);

    if (loading) {
        return <p>Loading board...</p>;
    }
    
    const formattedDate = new Date(board.created_at).toLocaleDateString("id-ID", {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div
            className="w-full min-h-screen bg-fixed"
            style={{
                background: board.color_code,
                backgroundAttachment: 'fixed', 
                backgroundSize: 'cover', 
            }}
        >
            <div
                className="w-full p-4 flex items-center justify-between bg-white bg-opacity-50"
            >
                <div className="text-gray-900 flex items-center space-x-4 gap-4">
                    <h2 className="text-xl font-semibold">{board.name}</h2>
                    <span className="text-sm text-gray-500">Dibuat pada: {formattedDate}</span>
                </div>

                <div className="text-gray-900 flex items-center space-x-4">
                    <img
                        src={board.user.photo ? `/storage/${board.user.photo}` : 'https://via.placeholder.com/150'}
                        alt="User Profile"
                        className="w-8 cursor-pointer hover:bg-indigo-100 rounded-full transition-all duration-300"
                    />
                </div>
            </div>

            <div className="p-6">
            </div>
        </div>
    );
};

export default BoardHeader;
