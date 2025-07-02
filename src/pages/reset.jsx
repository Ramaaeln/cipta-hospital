import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) return alert(error.message);

    setMessage("Password berhasil diperbarui. Silakan login kembali.");
  };

  return (
    <div className="h-screen bg-[var(--fourty-color)] -mt-35 flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Masukkan password baru"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Ubah Password
          </button>
        </form>
        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
