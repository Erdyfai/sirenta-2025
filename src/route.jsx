import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/participant/Dashboard';
import Faq from './pages/participant/Faq';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/participant/dashboard" element={<Dashboard />} />
        <Route path="/participant/faq" element={<Faq/>} />
      </Routes>
    </Router>
  );
}
