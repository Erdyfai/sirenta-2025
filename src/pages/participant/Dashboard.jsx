import Navbar from '../../components/Navbar';
import Timeline from '../../components/Timeline';
import RegistrationClosed from '../../components/RegistrationClosed';
import SelectionComplete from '../../components/SelectionComplete';
import { useState } from 'react';

export default function Dashboard() {
  // State
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false); // true kalau seleksi masih jalan
  const [isUserApplicant, setIsUserApplicant] = useState(false); // true kalau user adalah pendaftar
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(true); // true kalau pendaftaran sudah ditutup

  // Logic menentukan judul header
  let headerTitle = '';
  let headerSubtitle = '';
  if (isSelectionOngoing) {
    headerTitle = isUserApplicant || !isRegistrationClosed ? 'Progress Saya' : 'Pendaftaran Ditutup';
    headerSubtitle = 'Open Recruitment Asisten Lab 2025';
  } else {
    headerTitle = 'Seleksi Telah Selesai';
    headerSubtitle = 'Terima kasih atas partisipasi Anda';
  }

  // Logic menentukan komponen utama yang ditampilkan
  let mainComponent = null;
  if (isSelectionOngoing) {
    if (isUserApplicant || !isRegistrationClosed) {
      mainComponent = <Timeline />;
    } else {
      mainComponent = <RegistrationClosed />;
    }
  } else {
    mainComponent = <SelectionComplete />;
  }

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen w-[90%] mx-auto pt-28">
        {/* Welcome Text */}
        <div className="max-w-7xl mx-auto text-left pt-6 pb-6">
          <h1 className="text-2xl font-bold text-gray-800">Selamat Datang di</h1>
          <h2 className="text-4xl font-bold text-gray-800">
            Sistem Rekrutmen Asisten Laboratorium Informatika UMM
          </h2>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
          {/* Header box */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{headerTitle}</h2>
            <h3 className="text-lg font-medium text-gray-700">{headerSubtitle}</h3>
            <p className="text-sm text-gray-500">Lab IT UMM</p>
          </div>

          {/* Garis pemisah atas */}
          <div className="border-t border-gray-300 pt-6">{mainComponent}</div>

          {/* Garis pemisah bawah dan footer box */}
          <div className="border-t border-gray-300 mt-6 pt-4 text-sm flex justify-end">
            <p className="text-gray-500">
              Butuh bantuan?{' '}
              <a href="#" className="text-blue-600 font-medium">
                pusat bantuan
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
