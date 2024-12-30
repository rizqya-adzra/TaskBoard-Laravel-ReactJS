import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showToast } from './ToastNotification';

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(file); 
            const formData = new FormData();
            formData.append('photo', file);

            setIsLoading(true);
            setError(null); 

            try {
                const response = await axios.post('/api/user/photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                setUser((prevUser) => ({
                    ...prevUser,
                    photo: response.data.photo, 
                }));

                setPhoto(null);
                showToast('Foto berhasil diubah')
            } catch (error) {
                console.error('Error uploading photo:', error.response || error.message);
                setError(error.response ? error.response.data.message : 'Gagal mengunggah foto. Silakan coba lagi.');
                showToast('Foto gagal diubah, coba lagi')
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full p-6 flex flex-col">
            <div className="flex items-center mb-6 gap-4">
                <div className="relative group">
                    <img
                        src={user.photo ? `/storage/${user.photo}` : 'https://via.placeholder.com/150'}
                        alt="User Profile"
                        className="size-14 rounded-full transition-all duration-300"
                    />
                    <div
                        onClick={() => document.getElementById('file-input').click()}
                        className="absolute top-0 size-14 rounded-full bg-indigo-500 bg-opacity-50 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
                    >
                        <h5 className="text-xs font-bold">Ganti foto</h5>
                    </div>
                    <input
                        id="file-input"
                        type="file"
                        onChange={handleFileChange}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <div>
                    <h3 className="text-start font-bold text-xl">{user.name}</h3>
                    <h3 className="text-start">{user.email}</h3>
                </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            {isLoading && <div className="mt-4">Mengunggah foto...</div>}
        </div>
    );
};

export default UserInfo;
