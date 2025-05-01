// components/RegistrationClosed.jsx
import React from 'react';
import SelecCompleteImg from '../assets/selection_complete.png';

export default function RegistrationClosed() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <img
        src={SelecCompleteImg}
        alt="Masa Seleksi Usai"
        className="w-100 h-auto mb-10"
      />

      <p className="text-gray-600 max-w-md">
        Selamat kepada para peserta yang telah lolos seleksi! 🥳 Bagi yang belum berhasil, tetap semangat! Masih banyak kesempatan lain di rekrutmen berikutnya. 
        Terima kasih atas partisipasi dan semangat luar biasa kalian.
        Untuk informasi lebih lanjut, silakan hubungi kami melalui Instagram di <span className="font-semibold">@labit.umm</span>
      </p>
    </div>
  );
}
