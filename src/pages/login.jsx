import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        toast.error("Email belum dikonfirmasi. Silakan cek email Anda.");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Login berhasil!");
    setTimeout(() => navigate("/dashboard"), 1500); // Navigasi setelah 1.5 detik
  };

  return (
    <div className="h-screen bg-[var(--fourty-color)] -mt-40 flex items-center justify-center relative">
      <ToastContainer position="top-center" />
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--primary-color)] ">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-[var(--primary-color)] hover:underline">
              Lupa password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[var(--primary-color)] text-white py-2 rounded transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--secondary-color)]"
            }`}
          >
            {loading ? "Masuk..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
