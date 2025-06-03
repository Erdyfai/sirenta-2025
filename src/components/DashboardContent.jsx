import Breadcrumbs from "./BreadCrumbs";

/**
 * Komponen DashboardContent untuk menampilkan isi utama dashboard.
 * Termasuk sesi rekruitmen, data keahlian, jenis kelamin, dan angkatan.
 */
function DashboardContent() {
  // Data contoh untuk grafik Doughnut Jenis Kelamin dan Angkatan telah dihapus
  // karena pustaka chart.js tidak dapat diresolusi.
  // Anda dapat mengembalikan ini jika pustaka tersebut terinstal di lingkungan Anda.

  return (
    <div className="font-inter pt-24">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Bagian Daftar Sesi Recruitment Asisten */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">DAFTAR SESI RECRUITMENT ASISTEN</h2>
        <p className="text-sm text-gray-600 mb-4">
          Current Selected: <span className="font-semibold text-gray-800">Rekruitmen Asisten 2021</span>
          <br />
          Total Peserta: <span className="font-semibold text-gray-800">2</span>
        </p>
        <div className="relative flex items-center overflow-hidden">
          {/* Tombol Navigasi Kiri */}
          <button className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          {/* Daftar Kartu Sesi Rekruitmen */}
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide flex-grow px-10 py-2">
            <div className="flex-none w-64 p-4 border border-gray-200 rounded-lg text-center cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">Rekruitmen Asisten 2022</h3>
              <p className="text-xs text-gray-500 mt-1">3 tahun yang lalu</p>
            </div>
            <div className="flex-none w-64 p-4 border border-gray-200 rounded-lg text-center cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">TES DUMMY</h3>
              <p className="text-xs text-gray-500 mt-1">3 tahun yang lalu</p>
            </div>
            <div className="flex-none w-64 p-4 border border-gray-200 rounded-lg text-center cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">OPREC 2023 TESTING & QA</h3>
              <p className="text-xs text-gray-500 mt-1">2 tahun yang lalu</p>
            </div>
             <div className="flex-none w-64 p-4 border border-gray-200 rounded-lg text-center cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">Rekruitmen Asisten 2021</h3>
              <p className="text-xs text-gray-500 mt-1">4 tahun yang lalu</p>
            </div>
          </div>
          {/* Tombol Navigasi Kanan */}
          <button className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
        {/* Indikator Dot */}
        <div className="flex justify-center mt-4 space-x-2">
            <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="block w-2 h-2 bg-gray-800 rounded-full"></span> {/* Dot aktif */}
            <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>

      {/* Bagian Data Keahlian Peserta (Bar Chart) */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">DATA KEAHLIAN PESERTA</h2>
        <div className="space-y-4">
          {/* Bar untuk Pemrograman Web */}
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-700">pemrograman web</span>
            <div className="flex-1 bg-gray-200 h-6 rounded-full overflow-hidden ml-4">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '60%' }}></div> {/* Lebar contoh */}
            </div>
          </div>
          {/* Bar untuk Pemrograman Mobile */}
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-700">pemrograman mobile</span>
            <div className="flex-1 bg-gray-200 h-6 rounded-full overflow-hidden ml-4">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '85%' }}></div> {/* Lebar contoh */}
            </div>
          </div>
          {/* Bar untuk Desain Grafis */}
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-700">desain grafis</span>
            <div className="flex-1 bg-gray-200 h-6 rounded-full overflow-hidden ml-4">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '40%' }}></div> {/* Lebar contoh */}
            </div>
          </div>
          {/* Tambahkan keahlian lain sesuai kebutuhan */}
        </div>
      </div>

      {/* Bagian Data Jenis Kelamin & Data Angkatan (Doughnut Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kartu Data Jenis Kelamin */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">DATA JENIS KELAMIN</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500">Placeholder untuk Grafik Jenis Kelamin</p>
            
            {/*<Doughnut data={genderData} options={{ maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom' } } }} /> */} 
          </div>
        </div>

        {/* Kartu Data Angkatan */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">DATA ANGKATAN</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-gray-500">Placeholder untuk Grafik Angkatan</p>
            {/* <Doughnut data={generationData} options={{ maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom' } } }} /> */}
          </div>
        </div>
      </div>

      {/* Footer */}
        <footer className="mt-8 text-sm text-gray-500 text-center border-t border-gray-200 pt-4">
          Developed by Information System Division Infotech &copy; {new Date().getFullYear()} | Informatics Laboratory, University of Muhammadiyah Malang
        </footer>
    </div>
  );
}
  export default DashboardContent;


