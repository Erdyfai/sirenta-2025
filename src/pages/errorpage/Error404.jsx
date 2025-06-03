import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img404 from '../../assets/error404.svg';

const Error404 = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10); //in second

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-0 text-center font-mono bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! You ran out of light</h1>
      <p className="text-gray-600">The page you’re looking for is now out of reach. Let’s bring you back!</p>
      <img src={img404} alt="404 Illustration" className="max-w-full h-auto -mb-30" />
      <div className="-mt-10\">
        <button
          onClick={() => navigate('/')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-0 px-4 rounded-md mr-2 transition duration-200"
        >
          back home in 00:00:{countdown.toString().padStart(2, '0')}
        </button>
        <br />
        <a href="/" className="mt-2 inline-block text-blue-600 font-bold underline">
          HOME PAGE
        </a>
      </div>
    </div>
  );
};

export default Error404;
