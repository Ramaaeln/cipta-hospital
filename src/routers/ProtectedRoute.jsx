import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setChecking(false);
    });
  }, []);

  if (checking) return <p className="text-center mt-10">Memuat...</p>;

  return user ? children : <Navigate to="/login" />;
}
