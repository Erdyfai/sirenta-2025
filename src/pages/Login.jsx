import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import ButtonComponent from '../components/Button';
import Illustration from '../assets/sirentaloginillustration.svg';
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
    <div className="flex h-screen">
      <div className="flex-2 bg-white p-10 justify-center items-center">
        <h1 className="text-4xl mb-6 font-semibold text-center">Welcome to Sirenta</h1>
        <img src={Illustration} alt="" className="max-w-xs md:max-w-md lg:max-w-lg h-auto mx-auto" />
      </div>
      <div className="flex-1 bg-gray-800 flex flex-col justify-center p-10 gap-4">
        <h1 className="text-white text-2xl font-medium">Sign in to Sirenta</h1>
        <Alert severity="info">Sign in with your i-Lab account</Alert>
        <form action="" className="flex flex-col gap-4">
          <InputField
            label={'NIM/Username'}
            type={'text'}
            value={NIM}
            required={true}
            onChange={(e) => setNIM(e.target.value)}
            className="text-amber-50"
          />
          <InputField label={'Password'} type={'password'} value={Password} required={true} onChange={(e) => setPassword(e.target.value)} />
          <ButtonComponent name={'Login'} type="submit" onClick={handleLogin} size={'medium'} />
        </form>
      </div>
    </div>
  );
}
