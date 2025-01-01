import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Transition } from 'react-transition-group';
import { showToast } from './ToastNotification';

const CreateBoardModal = ({ isOpen, onClose, onBoardCreated }) => {
  const modalRef = useRef(null);
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('linear-gradient(45deg, #9AA6B2, #BCCCDC)');
  const [error, setError] = useState('');

  const gradients = [
    'linear-gradient(45deg, #3B82F6, #10B981)',
    'linear-gradient(45deg, #F59E0B, #EF4444)',
    'linear-gradient(45deg, #8B5CF6, #F59E0B)',
    'linear-gradient(45deg, #C04848, #480048)',
    'linear-gradient(45deg, #BCCCDC, #3B82F6)',
    'linear-gradient(45deg, #2BC0E4, #EAECC6)',
    'linear-gradient(45deg, #10B981, #8B5CF6)',
    'linear-gradient(45deg, #5C258D, #4389A2)',
    'linear-gradient(45deg, #9AA6B2, #BCCCDC)'
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (boardName.trim() === '') {
      setError('Nama Board tidak boleh kosong');
      return;
    }

    try {
      const response = await axios.post('/api/board/post', {
        name: boardName,
        description: description,
        color_code: selectedColor,
      });

      if (response.data.success) {
        const newBoard = response.data.board;
        showToast('Board berhasil dibuat!', 'success');
        setBoardName('');
        setDescription('');
        setSelectedColor('linear-gradient(45deg, #9AA6B2, #BCCCDC)');
        setError('');
        onBoardCreated(newBoard);
        onClose();
      } else {
        showToast('Gagal membuat board, coba lagi.', 'error');
      }

    } catch (err) {
      console.error(err);
      showToast('Terjadi kesalahan, coba lagi.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <Transition in={isOpen} timeout={300}>
      {(state) => (
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${state === 'entering' ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-96 shadow-lg transform transition-all"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Buat Board baru</h2>

              <form onSubmit={handleSubmit}>
                <div className="mt-4 mb-4">
                  <label className="block text-sm font-medium text-gray-700 my-4">
                    Nama Board
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama Board"
                    value={boardName}
                    onChange={(e) => {
                      setBoardName(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-2 border bg-gray-100 rounded-lg focus:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                </div>

                <div className="mt-4 mb-4">
                  <label className="block text-sm font-medium text-gray-700 my-4">
                    Deskripsi
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan deskripsi (opsional)"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-2 border bg-gray-100 rounded-lg focus:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                </div>

                <div className="mb-6 mt-3">
                  <label className="block text-sm font-medium text-gray-700 my-4">
                    Pilih warna
                  </label>
                  <div className="flex gap-2 justify-center">
                    {gradients.map((gradient, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedColor(gradient)}
                        className='w-8 h-8 rounded-full cursor-pointer'
                        style={{ background: gradient }} 
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-6 rounded">
                  <label className="block text-sm font-medium text-gray-700 my-4">
                    Tampilan Board
                  </label>
                  <div
                    className="w-full h-40 rounded-lg flex items-center justify-center border"
                    style={{ background: selectedColor }} 
                  >
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Preview"
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default CreateBoardModal;
