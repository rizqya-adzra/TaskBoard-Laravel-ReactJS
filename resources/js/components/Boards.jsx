import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'; 
import CreateBoard from './CreateBoard'
import axios from 'axios'
import Modal from './Modal'
import { showToast } from './ToastNotification'

const Boards = () => {
    const [boards, setBoards] = useState([])
    const [boardData, setBoardData] = useState([])
    const [loading, setLoading] = useState(true)
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, boardId: null })
    const [modal, setModal] = useState({ visible: false, type: '', boardId: null, boardName: '' })
    const contextMenuRef = useRef(null)

    const navigate = useNavigate();  

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('/api/board/index')
                setBoards(response.data.data)
            } catch (error) {
                console.error("Error fetching boards:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchBoards()

        const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setContextMenu((prev) => ({ ...prev, visible: false }))
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleBoardCreated = (newBoard) => {
        setBoards((prevBoards) => [...prevBoards, newBoard])
    }

    const handleRightClick = (event, boardId) => {
        event.preventDefault()
        const boardElement = event.target.closest('.board-item')
        const rect = boardElement.getBoundingClientRect()
        setContextMenu({
            visible: true,
            x: rect.right - 182,
            y: rect.top - 270,
            boardId,
        })
    }

    const handleRenameBoard = (boardId) => {
        setModal({ visible: true, type: 'rename', boardId })
        setContextMenu({ ...contextMenu, visible: false })
    }

    const handleDeleteBoard = (boardId) => {
        setModal({ visible: true, type: 'delete', boardId })
        setContextMenu({ ...contextMenu, visible: false })
    }

    const handleRenameConfirm = async () => {
        const newName = modal.boardName.trim()

        const renameBoard = async () => {
            try {
                const response = await axios.put(`/api/board/put/${modal.boardId}`, { name: newName })
                setBoards((prevBoards) =>
                    prevBoards.map((board) =>
                        board.id === modal.boardId ? { ...board, name: response.data.data.name } : board
                    )
                )
                showToast('Nama Board berhasil diubah')
            } catch (error) {
                console.error('Error renaming board:', error)
                showToast('Nama Board gagal diubah, coba lagi')
            } finally {
                setModal({ ...modal, visible: false })
            }
        }

        renameBoard()
    }

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`/api/board/delete/${modal.boardId}`)
            setBoards((prevBoards) =>
                prevBoards.filter((board) => board.id !== modal.boardId)
            )
            showToast('Board berhasil di hapus')
        } catch (error) {
            console.error('Error deleting board:', error)
            showToast('Gagal dihapus, coba lagi')
        } finally {
            setModal({ ...modal, visible: false })
        }
    }

    const handleBoardClick = async (e, boardId) => {
        e.preventDefault();

        try {
            const response = await axios.get(`/api/board/show/${boardId}`);
            console.log(response.data)
            setBoardData(response.data);

            navigate(`/board/show/${boardId}`); 
        } catch (error) {
            console.error('Error fetching board data:', error);
        }
    };

    return (
        <div className="relative">
            <div
                className={`absolute top-0 left-0 w-full h-full ${contextMenu.visible ? 'block' : 'hidden'}`}
                onClick={() => setContextMenu({ ...contextMenu, visible: false })}
            />

            <div
                ref={contextMenuRef}
                className={`absolute ${contextMenu.visible ? 'block' : 'hidden'} bg-white shadow-lg rounded-lg z-50 border`}
                style={{
                    position: 'absolute',
                    top: contextMenu.y,
                    left: contextMenu.x,
                    zIndex: 9999,
                    minWidth: '150px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                }}
            >
                <ul className="space-y-2 p-2">
                    <li
                        onClick={() => handleDeleteBoard(contextMenu.boardId)}
                        className="px-4 py-2 cursor-pointer text-red-500 hover:bg-indigo-100 hover:text-white rounded transition-colors duration-200"
                    >
                        Hapus
                    </li>
                    <li
                        onClick={() => handleRenameBoard(contextMenu.boardId)}
                        className="px-4 py-2 cursor-pointer hover:bg-indigo-100 hover:text-white rounded transition-colors duration-200"
                    >
                        Ganti Nama
                    </li>
                </ul>
            </div>

            <Modal
                visible={modal.visible}
                onClose={() => setModal({ ...modal, visible: false })}
                onConfirm={() =>
                    modal.type === 'rename' ? handleRenameConfirm() : handleDeleteConfirm()
                }
                title={modal.type === 'rename' ? <p>Ubah nama Board</p> : <p className="text-red-500">Yakin untuk menghapus?</p>}
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
                confirmText={modal.type === 'rename' ? <p>Simpan</p> : <p className="text-red-500">Hapus</p>}
            />

            <div className="grid gap-6 my-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    boards.map((board) => (
                        <div
                            key={board.id}
                            className="w-full max-w-xs text-center relative board-item"
                            onContextMenu={(e) => handleRightClick(e, board.id)}
                        >
                            <a href={`/board/show/${board.id}`} onClick={(e) => handleBoardClick(e, board.id)}>
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
                                <div className="absolute top-0 left-0 rounded w-full h-full flex justify-center items-center bg-indigo-500 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                    <h5 className="text-lg font-bold text-white">{board.name}</h5>
                                </div>
                            </a>
                        </div>
                    ))
                )}
                <CreateBoard onBoardCreated={handleBoardCreated} />
            </div>
        </div>
    )
}

export default Boards
