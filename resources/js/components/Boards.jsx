import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateBoard from './CreateBoard';
import axios from 'axios';
import Modal from './Modal';
import { showToast } from './ToastNotification';
import Options from './Options';

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState({
        showOptions: false,
        boardId: null,
    });
    const [modal, setModal] = useState({ visible: false, type: '', boardId: null, boardName: '' });
    
    const optionsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('/api/board/index');
                setBoards(response.data.data);
            } catch (error) {
                console.error('Error fetching boards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBoards();

        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setOptions((prev) => ({ ...prev, showOptions: false }));
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg font-semibold">Loading board...</p>
            </div>
        );
    }

    const handleBoardCreated = (newBoard) => {
        setBoards((prevBoards) => [...prevBoards, newBoard]);
    };

    const handleRightClick = (e, boardId) => {
        e.preventDefault(); 
        optionsRef.current = e.target.closest('.board-item');
        setOptions({
            showOptions: true,
            boardId,
        });
    };

    const handleRenameBoard = () => {
        setModal({ visible: true, type: 'rename', boardId: options.boardId });
        setOptions({ ...options, showOptions: false });
    };

    const handleDeleteBoard = () => {
        setModal({ visible: true, type: 'delete', boardId: options.boardId });
        setOptions({ ...options, showOptions: false });
    };

    const handleRenameConfirm = async () => {
        const newName = modal.boardName.trim();
        try {
            const response = await axios.put(`/api/board/put/${modal.boardId}`, { name: newName });
            setBoards((prevBoards) =>
                prevBoards.map((board) =>
                    board.id === modal.boardId ? { ...board, name: response.data.data.name } : board
                )
            );
            showToast('Nama Board berhasil diubah');
        } catch (error) {
            console.error('Error renaming board:', error);
            showToast('Nama Board gagal diubah, coba lagi');
        } finally {
            setModal({ ...modal, visible: false });
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`/api/board/delete/${modal.boardId}`);
            setBoards((prevBoards) =>
                prevBoards.filter((board) => board.id !== modal.boardId)
            );
            showToast('Board berhasil dihapus');
        } catch (error) {
            console.error('Error deleting board:', error);
            showToast('Gagal dihapus, coba lagi');
        } finally {
            setModal({ ...modal, visible: false });
        }
    };

    const handleBoardClick = async (e, boardId) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/board/show/${boardId}`);
            navigate(`/board/show/${boardId}`);
        } catch (error) {
            console.error('Error fetching board data:', error);
        }
    };

    return (
        <div className="relative">
            <div className="flex">
                <h1 className="text-lg font-bold">Boards Anda</h1>
            </div>

            <Options
                showOptions={options.showOptions}
                onEdit={handleRenameBoard}
                onDelete={handleDeleteBoard}
                optionsRef={optionsRef}
            />

            <Modal
                visible={modal.visible}
                onClose={() => setModal({ ...modal, visible: false })}
                onConfirm={() =>
                    modal.type === 'rename' ? handleRenameConfirm() : handleDeleteConfirm()
                }
                title={
                    modal.type === 'rename' ? (
                        <p>Ubah nama Board</p>
                    ) : (
                        <p className="text-red-500">Yakin untuk menghapus?</p>
                    )
                }
                body={
                    modal.type === 'rename' ? (
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Masukan nama Board baru"
                            onChange={(e) => setModal({ ...modal, boardName: e.target.value })}
                            value={modal.boardName || ''}
                            onKeyDown={(e) => e.key === 'Enter' && handleRenameConfirm()}
                        />
                    ) : (
                        <p>Apakah Anda yakin untuk menghapus? Board yang telah terhapus tidak dapat dikembalikan.</p>
                    )
                }
                confirmText={
                    modal.type === 'rename' ? (
                        <p>Simpan</p>
                    ) : (
                        <p>Hapus</p>
                    )
                }
            />

            <div className="grid gap-6 my-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    boards.map((board) => (
                        <div
                            key={board.id}
                            className="w-full max-w-xs text-center relative"
                            onContextMenu={(e) => handleRightClick(e, board.id)}
                        >
                            <a href={`/board/show/${board.id}`} onClick={(e) => handleBoardClick(e, board.id)} className='board-item'>
                                <div
                                    className="object-cover object-center w-full h-36 mx-auto rounded"
                                    style={{
                                        background: board.color_code,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h5 className="text-lg font-bold text-white">{board.name}</h5>
                                </div>
                                <div className="absolute top-0 left-0 rounded w-full h-full flex justify-center items-center bg-indigo-500 bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 ease-in-out">
                                    <h5 className="text-lg font-bold text-white">{board.name}</h5>
                                </div>
                            </a>
                        </div>
                    ))
                )}
                <CreateBoard onBoardCreated={handleBoardCreated} />
            </div>
        </div>
    );
};

export default Boards;
