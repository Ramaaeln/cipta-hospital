import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://cipta-hospital-omega.vercel.app/reset-password',
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setMessage("Link reset password telah dikirim ke email kamu.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen -mt-40 bg-[var(--fourty-color)] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-[var(--primary-color)] mb-2">
          🔒 Lupa Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Masukkan email yang terdaftar, kami akan mengirimkan link reset.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-gray-700 text-sm font-medium mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-[var(--primary-color)] hover:bg-[var(--secondary-color)]"
            }`}
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-green-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
