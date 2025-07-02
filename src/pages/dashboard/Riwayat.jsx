import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRiwayat = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    let query = supabase
      .from("reservasi")
      .select("id, layanan, tanggal, catatan")
      .eq("user_id", userId)
      .order("tanggal", { ascending: false });

    if (filter) {
      query = query
        .gte("tanggal", `${filter}-01`)
        .lte("tanggal", `${filter}-31`);
    }

    const { data, error } = await query;
    if (!error) setRiwayat(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRiwayat();
  }, [filter]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus riwayat ini?");
    if (!confirmed) return;

    const { error } = await supabase.from("reservasi").delete().eq("id", id);
    if (!error) {
      toast.success("Riwayat berhasil dihapus");
      fetchRiwayat();
    }
  };

  const handleExportExcel = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Layanan,Tanggal,Catatan"].concat(
        riwayat.map((r) => `${r.layanan},${r.tanggal},${r.catatan}`)
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "riwayat_reservasi.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer position="top-center" />
      <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-6">
        Riwayat Reservasi Anda
      </h2>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter Bulan
          </label>
          <input
            type="month"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        <button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition-all"
        >
          Export ke CSV
        </button>
      </div>

      {loading ? (
        <div className="text-gray-600">🔄 Memuat data riwayat...</div>
      ) : riwayat.length === 0 ? (
        <div className="text-gray-500 italic">Belum ada data reservasi.</div>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-xl shadow">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-[var(--thrid-color)] text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Layanan</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Catatan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3">{item.layanan}</td>
                  <td className="px-4 py-3">
                    {format(new Date(item.tanggal), "dd MMMM yyyy")}
                  </td>
                  <td className="px-4 py-3">{item.catatan || "-"}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium hover:underline transition"
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
