import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { CalendarDays, FileText, ClipboardPlus } from "lucide-react";

export default function DashboardPages() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Gagal mendapatkan user:", error.message);
        return;
      }
      setUser(data.user);
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4">
          Selamat Datang di Dashboard 👋
        </h1>

        {user && (
          <div className="bg-[var(--fourty-color)] p-4 rounded-xl mb-6 border border-gray-300">
            <p className="text-lg font-semibold text-gray-800 mb-1">
              👤 Nama: <span className="font-normal">{user.user_metadata?.name || "Tidak diketahui"}</span>
            </p>
            <p className="text-gray-700 mb-1">📧 Email: {user.email}</p>
            <p className="text-gray-600 text-sm">🆔 ID User: {user.id}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <DashboardCard
            icon={<ClipboardPlus className="text-white w-8 h-8" />}
            title="Reservasi Layanan"
            description="Buat reservasi pemeriksaan atau konsultasi baru"
            link="/dashboard/reservasi"
            bgColor="bg-blue-600"
          />
          <DashboardCard
            icon={<CalendarDays className="text-white w-8 h-8" />}
            title="Penjadwalan Kunjungan"
            description="Atur jadwal pemeriksaan dan kunjungan"
            link="/dashboard/jadwal"
            bgColor="bg-green-600"
          />
          <DashboardCard
            icon={<FileText className="text-white w-8 h-8" />}
            title="Riwayat Reservasi"
            description="Lihat semua riwayat reservasi Anda"
            link="/dashboard/riwayat"
            bgColor="bg-purple-600"
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, description, link, bgColor }) {
  return (
    <Link
      to={link}
      className="group border border-gray-200 hover:shadow-xl transition-all duration-300 rounded-xl p-5 bg-white flex flex-col gap-3 hover:scale-[1.02]"
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[var(--primary-color)] transition">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
