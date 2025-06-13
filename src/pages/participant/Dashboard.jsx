import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Navbar from '../../components/Navbar';
import Timeline from '../../components/Timeline';
import RegistrationClosed from '../../components/RegistrationClosed';
import SelectionComplete from '../../components/SelectionComplete';
import RegistrationOpen from '../../components/RegistrationOpen';
import LoadingSpinner from '../../components/LoadingSpinner';

import useParticipantStore from '../../stores/useParticipantStore';

export default function Dashboard() {
  const {
    fetchDashboardStatus,
    dashboardState,
    dashboardMessage,
  } = useParticipantStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false);
  const [isUserApplicant, setIsUserApplicant] = useState(false);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

  useEffect(() => {
    const loadDashboardStatus = async () => {
      try {
        await fetchDashboardStatus();
      } catch (error) {
        toast.error('Gagal memuat status dashboard.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardStatus();
  }, [fetchDashboardStatus]);

  useEffect(() => {
    if (!dashboardState) return;

    switch (dashboardState) {
      case 'recruitmen closed':
        setIsSelectionOngoing(false);
        break;
      case 'registration':
        setIsSelectionOngoing(true);
        setIsUserApplicant(false);
        setIsRegistrationClosed(false);
        break;
      case 'registration closed':
        setIsSelectionOngoing(true);
        setIsUserApplicant(false);
        setIsRegistrationClosed(true);
        break;
      case 'timeline':
        setIsSelectionOngoing(true);
        setIsUserApplicant(true);
        setIsRegistrationClosed(false);
        break;
      default:
        toast.error('Status tidak dikenali');
    }
  }, [dashboardState]);

  // Header Text
  let headerTitle = '';
  let headerSubtitle = '';

  if (isSelectionOngoing) {
    headerTitle = isUserApplicant ? 'Progress Saya' : (!isRegistrationClosed ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup');
    headerSubtitle = 'Open Recruitment Asisten Lab 2025';
  } else {
    headerTitle = 'Seleksi Telah Selesai';
    headerSubtitle = 'Terima kasih atas partisipasi Anda';
  }

  // Main Component
  let mainComponent = null;
  if (isLoading) {
    mainComponent = <LoadingSpinner size="md" />;
  } else {
    if (isSelectionOngoing) {
      if (isUserApplicant) {
        mainComponent = <Timeline />;
      } else if (!isRegistrationClosed) {
        mainComponent = <RegistrationOpen />;
      } else {
        mainComponent = <RegistrationClosed />;
      }
    } else {
      mainComponent = <SelectionComplete />;
    }
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
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{headerTitle}</h2>
            <h3 className="text-lg font-medium text-gray-700">{headerSubtitle}</h3>
            <p className="text-sm text-gray-500">Lab IT UMM</p>
          </div>

          {/* Main Section */}
          <div className="border-t border-gray-300 pt-6">
            {mainComponent}
          </div>

          {/* Footer */}
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
