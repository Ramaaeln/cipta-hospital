import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast.warn("Semua field wajib diisi");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name, 
        },
      },
    });

    if (signUpError) {
      toast.error(signUpError.message);
      setLoading(false);
      return;
    }

    toast.success("Registrasi berhasil! Silakan verifikasi melalui Email yang anda daftarkan.");
    setLoading(false);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="flex flex-col items-center  justify-center bg-[var(--fourty-color)] h-screen -mt-40">
      <ToastContainer position="top-center" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
      <h1 className="text-2xl font-bold text-center text-[var(--primary-color)] mb-4">Daftar Akun</h1>
      <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          className={`w-full bg-[var(--primary-color)] text-white py-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--secondary-color)]"
          }`}
          disabled={loading}
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>
      </div>
    </div>
  );
}
