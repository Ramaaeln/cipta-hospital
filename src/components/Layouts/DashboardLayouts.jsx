import NavbarDashboard from "../Fragments/NavbarDashboard";
import { Outlet } from "react-router-dom";

export default function DashboardLayouts() {
  return (
    <div>
      <NavbarDashboard />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
