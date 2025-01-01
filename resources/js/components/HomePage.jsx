import React from 'react';
import UserInfo from './UserInfo';
import Boards from './Boards';

const HomePage = () => {
    return (
        <div className="flex justify-center items-center max-w-full mt-8 mx-8">
            <div className="sm:w-64 md:w-96 lg:w-5/6 xl:w-5/6 xl:flex">
                <div className="w-full p-6 flex flex-col">
                    <UserInfo />
                    <Boards />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
