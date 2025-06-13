// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- PASTIKAN INI DIIMPOR
import Sidebar from '../components/Sidebar'; // PASTIKAN PATH INI BENAR SESUAI LOKASI Sidebar.jsx

const DashboardLayout = () => { // Tidak perlu menerima prop 'children' lagi
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Anda */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Jika ada Navbar/Header di atas, letakkan di sini */}
        {/* <Navbar /> */}

        {/* Area Konten Utama yang akan diisi oleh Outlet */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet /> {/* <-- INI PENTING! Akan merender komponen Route anak */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;