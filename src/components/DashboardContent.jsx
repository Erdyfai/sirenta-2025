import React from 'react';
import { Doughnut } from 'react-chartjs-2'; // Mengimpor komponen Doughnut
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Mengimpor elemen Chart.js yang dibutuhkan

// Mendaftarkan (register) elemen-elemen Chart.js agar grafik Doughnut bisa berfungsi
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardContent() {
  const statsCards = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
      ),
      value: "4",
      label: "TOTAL SESI",
      bgColor: "bg-blue-500",
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V8a2 2 0 00-2-2h-2m-4 0V4a2 2 0 00-2-2H7a2 2 0 00-2 2v4m0 0H3a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m4-12h2m-6 4h.01M12 16a2 2 0 00-2 2h4a2 2 0 00-2-2z"></path></svg>
      ),
      value: "80",
      label: "PENDAFTAR",
      bgColor: "bg-red-500",
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 18H18M4 6h18M4 12h18M4 18H18M4 6h18M4 12h18"></path></svg>
      ),
      value: "55",
      label: "TOTAL ASLEB",
      bgColor: "bg-green-500",
    },
  ];

  // Remove content from recruitmentSessions array
  const recruitmentSessions = []; 

  const applicantStatusBySession = [
    {
      id: 1,
      session: "Angkatan 2022",
      registered: 15,
      passedAdmin: 15,
      passedTest: 11,
      accepted: 7,
    },
    {
      id: 2,
      session: "Angkatan 2023",
      registered: 25,
      passedAdmin: 25,
      passedTest: 18,
      accepted: 6,
    },
    {
      id: 3,
      session: "Angkatan 2024",
      registered: 40,
      passedAdmin: 30,
      passedTest: 20,
      accepted: 9,
    },
  ];

  const importantNotifications = [
    { id: 1, type: "info", message: "Hasil tes Rekrutmen Asisten 2021 telah dipublikasikan.", time: "2 jam lalu" },
    { id: 2, type: "warning", message: "Sesi Tes CBT akan ditutup dalam 1 hari.", time: "1 hari lalu" },
    { id: 3, type: "success", message: "Berkas pendaftar telah diverifikasi.", time: "5 menit lalu" },
  ];

  const genderData = {
    labels: ['Laki-laki', 'Perempuan'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#3B82F6', '#EF4444'],
        hoverBackgroundColor: ['#2563EB', '#DC2626'],
        borderWidth: 0,
      },
    ],
  };

  const generationData = {
    labels: ['2022', '2023', '2024'],
    datasets: [
      {
        data: [18.75, 31.25, 50],
        backgroundColor: ['#EF4435', '#F77395', '#6B7280'],
        hoverBackgroundColor: ['#DC2626', '#EA580C', '#EAB308', '#16A34A', '#2563EB', '#4B5563'],
        borderWidth: 0,
      },
    ],
  };


  return (
    <div className="font-inter p-6">
      <div className="flex items-center text-sm text-gray-500 -mb-8">
        <span className="hover:text-blue-600 cursor-pointer transition-colors duration-200">Dashboard</span>
        <svg className="w-3 h-30 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        <span className="text-gray-700">Current</span>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">INFORMATION</h2>
        <p className="text-sm text-gray-600 -mb-4">
          <br />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {statsCards.map((card) => (
            <div key={card.id} className={`${card.bgColor} flex items-center justify-between p-5 rounded-lg shadow-md`}>
              <div className="flex-shrink-0">
                {card.icon}
              </div>
              <div className="text-right text-white">
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm opacity-90">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* This block will now render nothing because recruitmentSessions is empty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recruitmentSessions.map((session) => (
            <div key={session.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <h3 className="font-medium text-gray-800 text-base mb-1">{session.title}</h3>
              <p className="text-xs text-gray-500">{session.timeAgo}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">STATUS PENDAFTAR</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sesi
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mendaftar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lolos Adm
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lolos Tes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diterima
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicantStatusBySession.map((status) => (
                <tr key={status.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{status.session}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status.registered}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status.passedAdmin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status.passedTest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status.accepted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">NOTIFIKASI PENTING</h2>
        <div className="space-y-3">
          {importantNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center p-3 rounded-lg ${
                notification.type === 'info' ? 'bg-blue-50 text-blue-800' :
                notification.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                notification.type === 'success' ? 'bg-green-50 text-green-800' :
                'bg-gray-50 text-gray-800'
              }`}
            >
              <span className="mr-3">
                {notification.type === 'info' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                )}
                {notification.type === 'warning' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.518A8.955 8.955 0 0112 2.944a8.955 8.955 0 013.743.574 1 1 0 01.378 1.48L11.5 12h-3L4.12 5.068a1 1 0 01.378-1.48zM12 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                )}
                {notification.type === 'success' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                )}
              </span>
              <p className="text-sm flex-1">{notification.message}</p>
              <span className="text-xs text-opacity-75 ml-3">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>


{/* Bagian Data Jenis Kelamin & Data Angkatan (Doughnut Charts) */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Kartu Data Jenis Kelamin */}
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">DATA JENIS KELAMIN</h2>
    <div className="h-64 flex items-center justify-center"> {/* Hapus bg-gray-100 jika tidak diperlukan lagi */}
      <Doughnut
        data={genderData}
        options={{
          maintainAspectRatio: false, // Penting agar grafik mengisi ruang yang tersedia
          cutout: '65%', // Membuat efek 'donat' (lubang di tengah)
          plugins: {
            legend: {
              position: 'bottom', // Posisi legenda (Laki-laki/Perempuan)
            },
            tooltip: { // Tambahkan opsi tooltip agar data muncul saat di-hover
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += context.parsed + '%'; // Menampilkan persentase
                  }
                  return label;
                }
              }
            }
          },
        }}
      />
    </div>
  </div>

  {/* Kartu Data Angkatan */}
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">DATA ANGKATAN</h2>
    <div className="h-64 flex items-center justify-center"> {/* Hapus bg-gray-100 jika tidak diperlukan lagi */}
      <Doughnut
        data={generationData}
        options={{
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: { // Tambahkan opsi tooltip
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += context.parsed + '%';
                  }
                  return label;
                }
              }
            }
          },
        }}
      />
    </div>
  </div>
</div>

      <footer className="mt-8 text-sm text-gray-500 text-center border-t border-gray-200 pt-4">
        Developed by Information System Division Infotech &copy; 2025 | Informatics Laboratory, University of Muhammadiyah Malang
      </footer>
    </div>
  );
}

export default DashboardContent;