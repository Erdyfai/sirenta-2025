import React from 'react';
import { useNavigate } from 'react-router-dom';
import img500 from '../../assets/error500.svg';

import logo from '../../assets/logo-sirenta.png'; // opsional

  const Error500 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center font-mono bg-gray-100">
      <img src={logo} alt="Logo" className="w-25 mb-4" />
      <img src={img500} alt="500 Error" className="max-w-full h-auto -mb-28" />
      <p className="text-lg font-bold text-gray-800 mb-4">
        Sorry, there were some technical issues while processing your request.
      </p>
      <button
       onClick={() => navigate('/')}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl py-1 px-6 rounded-full transition duration-200"
>
       go back to homepage
      </button>

    </div>
  );
};

export default Error500;
