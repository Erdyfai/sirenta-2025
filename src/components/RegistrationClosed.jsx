// components/RegistrationClosed.jsx
import React from 'react';
import RegClosedImg from '../assets/registration_closed.png';

export default function RegistrationClosed() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <img
        src={RegClosedImg}
        alt="Masa Pendaftaran Usai"
        className="w-100 h-auto mb-10"
      />

      <p className="text-gray-600 max-w-md">
        Halo! Masa pendaftaran telah resmi ditutup. Terima kasih atas antusiasme yang luar biasa!
        Untuk informasi selanjutnya, jangan lupa ikuti dan pantau terus Instagram kami di <span className="font-semibold">@labit.umm</span>
      </p>
    </div>
  );
}
