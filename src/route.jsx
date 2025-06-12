import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

import ParticipantDashboard from './pages/participant/Dashboard';
import Faq from './pages/participant/Faq';
import Pendaftaran from './pages/participant/Pendaftaran';

import AdminDashboard from './pages/admin/Dashboard';
import KelolaSesi from './pages/admin/KelolaSesi';
import SesiPendaftaran from './pages/admin/SesiPendaftaran';
import KoleksiSoal from './pages/admin/KoleksiSoal';
import FAQ from './pages/admin/FAQ';
import KelolaSoal from './pages/admin/EditSoal';

import JuriDashboard from './pages/juri/Dashboard';

import Error404 from './pages/errorpage/Error404';
import Error500 from './pages/errorpage/Error500';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
      {/* Participant Route */}
      <Route element={<PrivateRoute allowedRoles={['participant']} />}>
        <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
        <Route path="/participant/faq" element={<Faq />} />
        <Route path="/participant/pendaftaran" element={<Pendaftaran />} />
      </Route>

      {/* Admin Route */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/kelola-sesi" element={<KelolaSesi />} />
        <Route path="/admin/:sesiId/:tahap" element={<SesiPendaftaran />} />
        <Route path="/admin/koleksi-soal" element={<KoleksiSoal />} />
        <Route path="/admin/koleksi-soal/edit" element={<KelolaSoal />} />
        <Route path="/admin/FAQ" element={<FAQ />} />
      </Route>

      {/* judger Route */}
      <Route element={<PrivateRoute allowedRoles={['jury']} />}>
        <Route path="/juri/dashboard" element={<JuriDashboard />} />
      </Route>

      <Route path="/error500" element={<Error500 />} />
      <Route path="/error404" element={<Error404 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
