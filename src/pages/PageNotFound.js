import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="bg-[#171725] h-dvh ">
            <div className="flex flex-col items-center justify-center">
            <h3 className='text-5xl text-white '>
                Trang này không tồn tại
            </h3>
            <NavLink to='/' className="px-4 py-3  rounded-md text-white font-semibold inline-block mt-10 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">Trang chủ</NavLink>
            </div>
            
        </div>
    );
};

export default PageNotFound;