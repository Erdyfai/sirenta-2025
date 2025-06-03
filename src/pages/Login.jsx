import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-sirenta.png';
import Alert from '@mui/material/Alert';
import { useAuthStore } from '../stores/useAuthStore';
import toast from 'react-hot-toast';

export default function Login() {
  const [nim, setNIM] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({
    nim: '',
    password: '',
    general: '',
  });

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  async function handleLogin(e) {
    e.preventDefault();

    setFormError({ nim: '', password: '', general: '' });

    let hasError = false;

    if (!nim.trim()) {
      setFormError((prev) => ({ ...prev, nim: 'NIM wajib diisi' }));
      hasError = true;
    }
    if (!password.trim()) {
      setFormError((prev) => ({ ...prev, password: 'Password wajib diisi' }));
      hasError = true;
    }
    if (hasError) return;

    try {
      await login({ nim, password });

      const user = useAuthStore.getState().authUser;
      if (user?.role === 'participant') {
        navigate('/participant/dashboard');
      } else if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user?.role === 'jury') {
        navigate('/juri/dashboard');
      }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login gagal';
      setFormError({ nim: '', password: '', general: msg });
      toast.error(msg);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-[1] md:flex-[2] bg-white p-6 sm:p-10 flex flex-col justify-center items-center text-center order-1 md:order-1">
        <h1 className="hidden sm:block text-3xl text-neutral-700 sm:text-4xl font-semibold mb-4">
          Welcome to Sirenta
        </h1>
        <img
          src={logo}
          alt="Sirenta Logo"
          className="w-[50%] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto"
        />
      </div>

      <div className="flex-[2] md:flex-[1] bg-dark-lab2 border-l-8 border-orange-lab flex flex-col justify-center px-6 sm:px-10 py-10 gap-4 order-2 md:order-2">
        <h1 className="text-white text-xl sm:text-2xl font-medium">Sign in to Sirenta</h1>
        <Alert severity="info">Sign in with your i-Lab account</Alert>

        {formError.general && (
          <Alert severity="error" className="mb-2">
            {formError.general}
          </Alert>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Username */}
          <div className="flex flex-col">
            <input
              id="username"
              placeholder="NIM / Username"
              type="text"
              value={nim}
              onChange={(e) => setNIM(e.target.value)}
              className={`w-full rounded-md px-4 py-2 text-gray-700 bg-orange-50 border transition duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-400 ${
                formError.nim ? 'border-red-500 focus:ring-red-400 bg-red-50 animate-shake' : 'border-orange-500'
              }`}
            />
            {formError.nim && (
              <p className="text-red-500 text-sm mt-1">{formError.nim}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-md px-4 py-2 text-gray-700 bg-orange-50 border transition duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-400 ${
                formError.password ? 'border-red-500 focus:ring-red-400 bg-red-50 animate-shake' : 'border-orange-500'
              }`}
            />
            {formError.password && (
              <p className="text-red-500 text-sm mt-1">{formError.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="py-2.5 px-5 text-sm font-medium text-white bg-orange-lab rounded-lg hover:bg-red-lab hover:text-gray-300 hover:cursor-pointer focus:ring-4 focus:ring-white-100"
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <footer className="absolute bottom-2 w-full text-sm text-gray-500">
      Developed by Information System Division Infotech &copy; {new Date().getFullYear()} | Informatics Laboratory, University of Muhammadiyah Malang
      </footer>
    </div>
  );
}
