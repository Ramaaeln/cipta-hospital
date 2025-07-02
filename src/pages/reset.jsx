import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setMessage("✅ Password berhasil diperbarui. Silakan login kembali.");
    setPassword("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen -mt-40 bg-[var(--fourty-color)] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-[var(--primary-color)] mb-2">
          🔐 Reset Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Silakan masukkan password baru Anda di bawah ini.
        </p>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 font-medium block mb-1">
              Password Baru
            </label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white rounded-lg transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Memperbarui..." : "Ubah Password"}
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-center mt-4 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
