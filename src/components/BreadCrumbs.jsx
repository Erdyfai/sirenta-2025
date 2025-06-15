import { Link, useLocation } from "react-router-dom";

// Optional: mapping label yang lebih ramah
const breadcrumbNameMap = {
  admin: "Admin",
  dashboard: "Dashboard",
  "kelola-soal": "Kelola Soal",
  edit: "Edit",
};

const customRouteMap = {
  admin: "/admin/dashboard", // override klik "Admin" agar menuju dashboard
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  let accumulatedPath = "";

  return (
    <div className="flex items-center text-sm text-gray-500 mb-6">
      <Link to="/admin/dashboard" className="hover:text-orange-600 transition-colors duration-200">Home</Link>

      {pathnames.map((segment, index) => {
        accumulatedPath += `/${segment}`;
        const isLast = index === pathnames.length - 1;

        const label = breadcrumbNameMap[segment] || decodeURIComponent(segment);
        const targetPath = customRouteMap[segment] || accumulatedPath;

        return (
          <div key={`breadcrumb-${index}-${targetPath}`} className="flex items-center">
            <svg className="w-3 h-3 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            {isLast ? (
              <span className="text-gray-700 capitalize">{label}</span>
            ) : (
              <Link to={targetPath} className="hover:text-orange-600 transition-colors duration-200 capitalize">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
