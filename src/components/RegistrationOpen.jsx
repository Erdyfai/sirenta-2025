import React from 'react';
import { Link } from 'react-router-dom'; 
import RegOpenimg from '../assets/regopen.png';

export default function RegistrationOpen() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <img
        src={RegOpenimg}
        alt="Pendaftaran dibuka"
        className="w-100 h-auto mb-10"
      />

      <p className="text-gray-600 max-w-md mb-6">
        Halo! Masa pendaftaran telah resmi dibuka. Yuk, segera daftarkan dirimu dengan klik tombol di bawah dan jadi bagian dari Assistant Laboratorium UMM!
        Untuk informasi lengkap dan update terbaru, jangan lupa ikuti Instagram kami di <span className="font-semibold">@labit.umm</span>
      </p>

      <Link
        to="/participant/pendaftaran" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
      >
        Daftar Sekarang
      </Link>
    </div>
  );
}
