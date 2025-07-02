import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[var(--fourty-color)] px-4 text-center">
      <h1 className="text-7xl font-bold text-[var(--primary-color)] mb-4 animate-pulse">404</h1>
      <p className="text-xl text-gray-700 mb-2">Oops! Halaman tidak ditemukan.</p>
      <p className="text-gray-600 mb-6">
        Halaman yang kamu cari mungkin sudah dihapus atau pindah ke lokasi lain.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold shadow hover:bg-[var(--secondary-color)] transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
