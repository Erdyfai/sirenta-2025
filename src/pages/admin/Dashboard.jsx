import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import DashboardContent from '../../components/DashboardContent';

// import { Doughnut } from 'react-chartjs-2'; // Dihapus karena kesalahan kompilasi
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Dihapus karena kesalahan kompilasi

// Chart.js dan komponen Doughnut telah dihapus untuk mengatasi kesalahan kompilasi.
// Jika Anda ingin menggunakan grafik, pastikan pustaka ini terinstal di lingkungan Anda.
// ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Komponen utama aplikasi.
 * Menggabungkan Sidebar, Header, dan DashboardContent.
 */
function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;