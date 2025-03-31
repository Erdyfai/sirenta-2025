import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-sirenta.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="relative w-full"> {/* Tambahkan relative */}
      {/* Navbar desktop */}
      <div className="navbar bg-base-100 shadow-sm md:px-16 md:py-6 md:fixed md:w-full md:top-0 md:left-0 z-50">
        <div className="flex-1">
          <Link to="/participant/dashboard" className="flex items-center">
            <img src={logo} alt="Sirenta Logo" className="h-16 w-auto" /> 
          </Link>
        </div>

        <div className="hidden md:flex flex-none justify-center items-center">
          <ul className="menu menu-horizontal px-8">
            <li>
              <Link to="/participant/dashboard">Beranda</Link>
            </li>
            <li>
              <Link to="/participant/faq">FAQ</Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-max p-2 shadow">
              <li>
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>

        <button className="md:hidden btn btn-ghost btn-circle" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Navbar mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="btn btn-ghost absolute top-2 right-2" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul className="menu p-4">
          <li>
            <Link to="/participant/dashboard" onClick={toggleSidebar}>Beranda</Link>
          </li>
          <li>
            <Link to="/participant/faq" onClick={toggleSidebar}>FAQ</Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSidebar}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
