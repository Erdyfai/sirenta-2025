import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-sirenta.png';
import ThemeController from './ThemeController';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('admin');

  // Daftar menu berdasarkan role
  const menus = {
    participant: [
      { name: 'Beranda', path: '/participant/dashboard' },
      { name: 'FAQ', path: '/participant/faq' },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard' },
      { name: 'Kelola Sesi', path: '/admin/kelola-sesi' },
    ],
  };

  const currentMenu = menus[role] || [];

  return (
    <div className="container mx-auto w-full">
      {/* Navbar desktop */}
      <div className="navbar bg-base-100 shadow-sm md:px-16 md:py-4 md:fixed md:w-full md:top-0 md:left-0">
        <div className="flex-1">
          <Link to="/" className="inline-block">
            <img src={logo} alt="Sirenta Logo" className="h-16 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex flex-none justify-center items-center gap-8">
          <ul className="menu menu-horizontal gap-4">
            {currentMenu.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-max p-2 shadow">
              <li>
                <Link to="/" onClick={() => setRole('')}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <ThemeController />
        </div>

        <button className="md:hidden btn btn-ghost btn-circle" onClick={() => setOpen(!open)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Navbar mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg transform z-50 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="btn btn-ghost absolute top-2 right-2" onClick={() => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul className="menu p-4">
          {currentMenu.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/" onClick={() => setRole('')}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
