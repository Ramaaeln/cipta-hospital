import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

export default function Jadwal() {
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [catatan, setCatatan] = useState("");
  const [jadwalList, setJadwalList] = useState([]);

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .eq("user_id", userId)
      .order("tanggal", { ascending: true });

    if (error) return toast.error("Gagal memuat data jadwal");
    setJadwalList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    const { error } = await supabase.from("jadwal").insert([
      { tanggal, waktu, catatan, user_id: userId },
    ]);

    if (error) return toast.error("Gagal menyimpan jadwal");

    toast.success("Jadwal berhasil ditambahkan!");
    setTanggal("");
    setWaktu("");
    setCatatan("");
    fetchJadwal();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus jadwal ini?");
    if (!confirmed) return;

    const { error } = await supabase.from("jadwal").delete().eq("id", id);
    if (!error) {
      toast.success("Jadwal dihapus");
      fetchJadwal();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ToastContainer position="top-center" />
      <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-6">
        Penjadwalan Kunjungan
      </h2>

      {/* Form Penjadwalan */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl shadow p-6 mb-8 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Kunjungan
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waktu Kunjungan
            </label>
            <input
              type="time"
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Contoh: bawa hasil lab atau puasa sebelum pemeriksaan"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-[var(--primary-color)]"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="bg-[var(--primary-color)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all w-full md:w-fit"
        >
          Simpan Jadwal
        </button>
      </form>

      {/* Daftar Jadwal */}
      {jadwalList.length === 0 ? (
        <p className="text-gray-600 italic">Belum ada jadwal kunjungan.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-[var(--thrid-color)] text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Waktu</th>
                <th className="px-4 py-3 text-left">Catatan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jadwalList.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3">
                    {format(new Date(item.tanggal), "dd MMMM yyyy")}
                  </td>
                  <td className="px-4 py-3">{item.waktu}</td>
                  <td className="px-4 py-3">{item.catatan || "-"}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline hover:text-red-800 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
