import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ParticipantDashboard from './pages/participant/Dashboard';
import Faq from './pages/participant/Faq';
import AdminDashboard from './pages/admin/Dashboard';
import KelolaSesi from './pages/admin/KelolaSesi';
import KoleksiSoal from './pages/admin/KoleksiSoal';
import LayananPengaduan from './pages/admin/LayananPengaduan';
import Error404 from './pages/errorpage/Error404';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
        <Route path="/participant/faq" element={<Faq/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/kelola-sesi" element={<KelolaSesi/>} />
        <Route path="/admin/koleksi-soal" element={<KoleksiSoal />} />
        <Route path="/admin/layanan-pengaduan" element={<LayananPengaduan/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </Router>
  );
}
