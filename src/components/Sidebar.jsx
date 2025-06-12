import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, CalendarCheck, AlertCircle, HelpCircle } from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <Home className="w-5 h-5 mr-3" />,
    },
    {
      type: 'label',
      label: 'REKRUITMEN',
    },
    {
      label: 'Koleksi Soal',
      path: '/admin/koleksi-soal',
      icon: <FileText className="w-5 h-5 mr-3" />,
    },
    {
      label: 'Kelola Sesi',
      path: '/admin/kelola-sesi',
      icon: <CalendarCheck className="w-5 h-5 mr-3" />,
    },
    {
      label: 'Layanan Pengaduan',
      path: '#',
      icon: <AlertCircle className="w-5 h-5 mr-3" />,
      external: true,
    },
    {
      label: 'Kelola FAQ',
      path: '/admin/FAQ',
      icon: <HelpCircle className="w-5 h-5 mr-3" />,
      external: true,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col rounded-r-lg pt-24">
      {/* Logo dan Nama Aplikasi */}
      {/* <img src={Logo} alt="Sirenta Logo" className="h-12 mx-auto mb-4" /> */}

      {/* Navigasi */}
      <nav className="flex-1 py-4">
        <ul>
          {navItems.map((item) => {
            if (item.type === 'label') {
              return (
                <li key={`label-${item.label}`} className="mb-2 mt-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase px-6 tracking-wider">{item.label}</span>
                </li>
              );
            }

            const isActive = location.pathname.startsWith(item.path);
            const baseClasses = `flex items-center py-2 px-6 rounded-r-full font-inter transition-colors duration-200`;
            const activeClasses = isActive ? 'bg-blue-50 text-orange-lab' : 'text-gray-600 hover:bg-gray-100 hover:text-orange-lab';

            const key = `nav-${item.path || item.label}`;

            if (item.external) {
              return (
                <li key={key} className="mb-2">
                  <Link to={item.path} className={`${baseClasses} ${activeClasses}`}>
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={key} className="mb-2">
                <Link to={item.path} className={`${baseClasses} ${activeClasses}`}>
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
