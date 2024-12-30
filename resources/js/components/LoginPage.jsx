import React from 'react';
import LoginForm from './LoginForm';
import BackgroundImage from './BackgroundImage';

const LoginPage = () => {
    return (
        <div className="fixed inset-0 bg-gray-100 text-gray-900 flex items-center justify-center p-4 z-1">
            <div className="w-full max-w-screen-lg bg-white shadow sm:rounded-lg flex flex-col sm:flex-row justify-center flex-0">
                <div className="sm:w-1/2 lg:w-1/3 xl:w-5/12 p-4 sm:p-12">
                    <div className="mt-8 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-[#3B1E54]">
                            Login
                        </h1>
                        <LoginForm />
                    </div>
                </div>

                <BackgroundImage />
            </div>
        </div>
    );
};

export default LoginPage;
