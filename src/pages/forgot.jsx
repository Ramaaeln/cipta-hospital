import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password', // Sesuaikan
    });

    if (error) {
      return alert(error.message);
    }

    setMessage("Link reset password telah dikirim ke email kamu.");
  };

  return (
    <div className="h-screen bg-[var(--fourty-color)] -mt-35 flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
          Lupa Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan email kamu"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Kirim Link Reset
          </button>
        </form>
        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
