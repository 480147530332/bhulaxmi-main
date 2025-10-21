import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Products", icon: <Package size={20} />, path: "/admin/products" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" },
    { name: "Customers", icon: <Users size={20} />, path: "/admin/customers" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 h-screen w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">💎 Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition ${
                location.pathname === item.path ? "bg-gray-800" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="m-4 p-2 flex items-center gap-2 justify-center bg-red-600 hover:bg-red-700 rounded-md transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
