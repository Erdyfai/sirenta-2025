import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import ButtonComponent from '../components/Button';
import logo from '../assets/logo-sirenta.png';
import Alert from '@mui/material/Alert';

export default function Login() {
  const [NIM, setNIM] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate('/Participant');
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-[1] md:flex-[2] bg-white p-6 sm:p-10 flex flex-col justify-center items-center text-center order-1 md:order-1">
        <h1 className="hidden sm:block text-3xl text-neutral-700 sm:text-4xl font-semibold mb-4">Welcome to Sirenta</h1>
        <img src={logo} alt="Sirenta Logo" className="w-[50%] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto" />
      </div>

      <div className="flex-[2] md:flex-[1] bg-dark-lab2 border-l-8 border-orange-lab flex flex-col justify-center px-6 sm:px-10 py-10 gap-4 order-2 md:order-2">
        <h1 className="text-white text-xl sm:text-2xl font-medium">Sign in to Sirenta</h1>
        <Alert severity="info">Sign in with your i-Lab account</Alert>
        <form className="flex flex-col gap-6">
          <InputField
            id="username"
            placeholder="NIM/Username"
            type="text"
            value={NIM}
            required
            onChange={(e) => setNIM(e.target.value)}
            className="bg-orange-50 appearance-none border-l-2 border-b-3 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
          />
          <InputField
            id="password"
            placeholder="Password"
            type="password"
            value={Password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="bg-orange-50 appearance-none border-l-2 border-b-3 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
          />
          <ButtonComponent
            onClick={handleLogin}
            className="py-2.5 px-5 text-sm font-medium text-white bg-orange-lab rounded-lg hover:bg-red-lab hover:text-gray-300 hover:cursor-pointer focus:ring-4 focus:ring-white-100"
          >
            Login
          </ButtonComponent>
        </form>
      </div>

      <footer className="absolute bottom-2 w-full text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sirenta. All rights reserved.
      </footer>
    </div>
  );
}
