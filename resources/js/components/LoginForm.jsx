import React, { useState } from 'react';
import axios from 'axios';
import { showToast } from './ToastNotification';
import { Link, useNavigate } from 'react-router-dom'; 

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
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

        try {
            const response = await axios.post('/api/login/post', formData);
            setLoading(false);

            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                showToast('Login berhasil!', 'success');
                navigate('/home');
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                showToast('Login gagal, coba lagi!', 'error');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full my-12">
            <div className='mb-6'>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
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
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <p className='text-center my-4 text-sm'>
                Belum punya akun?
                <Link to="/register"><span className='underline'> Daftar di sini</span></Link>
            </p>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-[#9B7EBD] text-white font-semibold hover:bg-[#3B1E54] transition-all duration-300 ease-in-out"
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;
