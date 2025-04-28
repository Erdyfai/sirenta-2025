import Navbar from '../../components/Navbar';
import Timeline from '../../components/Timeline';
import RegistrationClosed from '../../components/RegistrationClosed';
import SelectionComplete from '../../components/SelectionComplete';
import { useState } from 'react';

export default function Dashboard() {
  // State
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(true); // true kalau seleksi masih jalan
  const [isUserApplicant, setIsUserApplicant] = useState(false); // true kalau user adalah pendaftar

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 pt-35">
          {/* Welcome Text */}
          <div className="max-w-7xl mx-auto text-left mb-8 pt-20 pb-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Selamat Datang di
            </h1>
            <h2 className="text-4xl font-bold text-gray-800">
              Sistem Rekrutmen Asisten Laboratorium Informatika UMM
            </h2>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
            {/* Header box */}
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {isSelectionOngoing
                  ? isUserApplicant
                    ? 'Progress Saya'
                    : 'Pendaftaran Ditutup'
                  : 'Seleksi Telah Selesai'}
              </h2>
              <h3 className="text-lg font-medium text-gray-700">
                {isSelectionOngoing
                  ? 'Open Recruitment Asisten Lab 2025'
                  : 'Terima kasih atas partisipasi Anda'}
              </h3>
              <p className="text-sm text-gray-500">
                Lab IT UMM
              </p>
            </div>

            {/* Garis pemisah atas */}
            <div className="border-t border-gray-300 pt-6">
              {isSelectionOngoing ? (
                isUserApplicant ? (
                  <Timeline />
                ) : (
                  <RegistrationClosed />
                )
              ) : (
                <SelectionComplete />
              )}
            </div>

            {/* Garis pemisah bawah dan footer box */}
            <div className="border-t border-gray-300 mt-6 pt-4 text-sm flex justify-end">
              <p className="text-gray-500">
                Butuh bantuan? <a href="#" className="text-blue-600 font-medium">pusat bantuan</a>
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}
