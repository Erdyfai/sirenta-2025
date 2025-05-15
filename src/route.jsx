import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ParticipantDashboard from './pages/participant/Dashboard';
import Faq from './pages/participant/Faq';
import AdminDashboard from './pages/admin/Dashboard';
import KelolaSesi from './pages/admin/KelolaSesi';
import KoleksiSoal from './pages/admin/KoleksiSoal';
import LayananPengaduan from './pages/admin/LayananPengaduan';
import Error404 from './pages/errorpage/Error404';
import Error500 from './pages/errorpage/Error500';
import Pendaftaran from './pages/participant/Pendaftaran';
import Dashboard from './pages/juri/Dashboard';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
        <Route path="/participant/faq" element={<Faq />} />
        <Route path="/participant/pendaftaran" element={<Pendaftaran />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/kelola-sesi" element={<KelolaSesi />} />
        <Route path="/admin/koleksi-soal" element={<KoleksiSoal />} />
        <Route path="/admin/layanan-pengaduan" element={<LayananPengaduan />} />
        <Route path="/error500" element={<Error500 />} />
        <Route path="/juri/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}
