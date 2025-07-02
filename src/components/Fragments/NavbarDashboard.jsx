import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function NavbarDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout gagal:", error.message);
    } else {
      navigate("/login");
    }
  };

  // Untuk menandai halaman aktif (optional styling)
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[var(--primary-color)] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold tracking-tight">
          🏥 Cipta Hospital
        </Link>

        <div className="flex gap-4 items-center text-sm md:text-base">
          <NavLink to="/dashboard" active={isActive("/dashboard")}>
            Beranda
          </NavLink>
          <NavLink to="/dashboard/reservasi" active={isActive("/dashboard/reservasi")}>
            Reservasi
          </NavLink>
          <NavLink to="/dashboard/jadwal" active={isActive("/dashboard/jadwal")}>
            Jadwal
          </NavLink>
          <NavLink to="/dashboard/riwayat" active={isActive("/dashboard/riwayat")}>
            Riwayat
          </NavLink>

          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-1.5 bg-white text-[var(--primary-color)] font-semibold rounded-lg hover:bg-gray-100 transition-all text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

// Komponen kecil untuk tautan navbar agar lebih modular
function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`hover:underline hover:font-semibold transition ${
        active ? "underline font-semibold" : ""
      }`}
    >
      {children}
    </Link>
  );
}
