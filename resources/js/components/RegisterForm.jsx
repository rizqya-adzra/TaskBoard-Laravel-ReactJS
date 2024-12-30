import React, { useState } from 'react';
import { showToast } from './ToastNotification';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({}); 

        try {
            const response = await axios.post('/api/register/post', formData);
            setLoading(false);

            if (response.data.success) {
                showToast('Registrasi berhasil!', 'success');
                navigate('/home');
            } else if (response.data.errors?.email) {
                showToast('Email sudah terpakai', 'error');
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                showToast('Terjadi kesalahan, coba lagi.', 'error');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full my-12">
            <div className='mb-6'>
                <input
                    type="text"
                    name="name"
                    placeholder="Username Anda"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className='mb-6'>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Anda"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className='mb-6'>
                <input
                    type="password"
                    name="password"
                    placeholder="Password Anda"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className='mb-6'>
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Konfirmasi password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
            </div>

            <p className='text-center my-4 text-sm'>
                Sudah punya akun?
                <Link to="/"><span className='underline'> Login di sini</span></Link>
            </p>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-[#9B7EBD] text-white font-semibold hover:bg-[#3B1E54] transition-all duration-300 ease-in-out"
            >
                {loading ? 'Loading...' : 'Daftar'}
            </button>
        </form>
    );
};

export default RegisterForm;
