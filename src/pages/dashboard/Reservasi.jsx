import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reservasi() {
  const [layanan, setLayanan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!layanan || !tanggal) {
      toast.warn("Layanan dan tanggal wajib diisi.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("reservasi").insert([
      {
        user_id: user.id,
        layanan,
        tanggal,
        catatan,
      },
    ]);

    if (error) {
      toast.error("Gagal menyimpan reservasi: " + error.message);
    } else {
      toast.success("Reservasi berhasil dibuat!");
      setLayanan("");
      setTanggal("");
      setCatatan("");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
      <ToastContainer position="top-center" />
      <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-6 text-center">
        Formulir Reservasi Layanan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Layanan */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Pilih Layanan <span className="text-red-500">*</span>
          </label>
          <select
            value={layanan}
            onChange={(e) => setLayanan(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          >
            <option value="">-- Pilih Layanan --</option>
            <option value="Konsultasi Dokter">Konsultasi Dokter</option>
            <option value="Pemeriksaan Umum">Pemeriksaan Umum</option>
            <option value="Laboratorium">Laboratorium</option>
            <option value="Vaksinasi">Vaksinasi</option>
          </select>
        </div>

        {/* Tanggal */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tanggal Reservasi <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Catatan */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows="3"
            placeholder="Contoh: bawa hasil tes sebelumnya"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        {/* Tombol */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
            loading
              ? "bg-[var(--primary-color)] opacity-50 cursor-not-allowed"
              : "bg-[var(--primary-color)] hover:bg-blue-700"
          }`}
        >
          {loading ? "Menyimpan..." : "Kirim Reservasi"}
        </button>
      </form>
    </div>
  );
}
