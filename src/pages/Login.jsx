import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import ButtonComponent from '../components/Button';

export default function Login() {
  const [NIM, setNIM] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate('/Participant');
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-amber-700">Login to sirenta</h1>
      <form action="" className="flex flex-col gap-4">
        <InputField label={'NIM/Username'} type={'text'} value={NIM} required={true} onChange={(e) => setNIM(e.target.value)} />
        <InputField label={'Password'} type={'password'} value={Password} required={true} onChange={(e) => setPassword(e.target.value)} />
        <ButtonComponent name={'Login'} type="submit" onClick={handleLogin} />
      </form>
    </div>
  );
}
