import React from 'react';
import { Home, FileText, CalendarCheck, AlertCircle } from 'lucide-react';
import Logo from '../assets/icon-sirenta-home.png';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col rounded-r-lg pt-25">
      {/* Logo dan Nama Aplikasi */}
     
      {/* Daftar Navigasi */}
      <nav className="flex-1 py-4">
        <ul>
          <li className="mb-2">
            {/* Item Dashboard (aktif) */}
            <a href="#" className="flex items-center py-2 px-6 text-gray-600  hover:text-orange-lab bg-blue-50 rounded-r-full font-semibold">
              {/* Icon Dashboard */}
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Dashboard
            </a>
          </li>
          <li className="mb-2 mt-4">
            {/* Kategori Rekruitmen */}
            <span className="text-xs font-semibold text-gray-400 uppercase px-6 tracking-wider">REKRUITMEN</span>
          </li>
          <li className="mb-2">
            {/* Item Koleksi Soal */}
            <Link to="/admin/koleksi-soal" className="flex items-center py-2 px-6 text-gray-600 hover:bg-gray-100 hover:text-orange-lab rounded-r-full transition-colors duration-200">
              {/* Icon Koleksi Soal */}
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              Koleksi Soal
            </Link>
          </li>
          <li className="mb-2">
            {/* Item Kelola Sesi */}
            <Link to="/admin/kelola-sesi" className="flex items-center py-2 px-6 text-gray-600 hover:bg-gray-100 hover:text-orange-lab rounded-r-full transition-colors duration-200">
              {/* Icon Kelola Sesi */}
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Kelola Sesi
            </Link>
          </li>
          <li className="mb-2">
            {/* Item Layanan Pengaduan */}
            <a href="#" className="flex items-center py-2 px-6 text-gray-600 hover:bg-gray-100 hover:text-orange-lab rounded-r-full transition-colors duration-200">
              {/* Icon Layanan Pengaduan */}
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              Layanan Pengaduan
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
