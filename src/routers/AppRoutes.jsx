import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import HomePages from "../pages/home";
import MainLayouts from "../components/Layouts/MainLayouts";
import LoginPages from "../pages/login";
import AboutPages from "../pages/about";
import RegisterPages from "../pages/register";
import DashboardPages from "../pages/dasboard";
import { useEffect, useState } from "react";
import ForgotPassword from "../pages/forgot";
import ResetPassword from "../pages/reset";
import NotFound from "../pages/404";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayouts from "../components/Layouts/DashboardLayouts";
import Reservasi from "../pages/dashboard/Reservasi";
import Jadwal from "../pages/dashboard/Jadwal";
import Riwayat from "../pages/dashboard/Riwayat";

export default function AppRoutes() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<HomePages />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPages />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayouts />
          </ProtectedRoute>
        }
      > 
        <Route path="/dashboard" element={<DashboardPages />} />
        <Route path="/dashboard/reservasi" element={<Reservasi />} />
        <Route path="/dashboard/jadwal" element={<Jadwal />} />
        <Route path="/dashboard/riwayat" element={<Riwayat />} />
      </Route>
    </Routes>
  );
}
