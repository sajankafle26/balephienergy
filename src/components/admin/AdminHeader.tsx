"use client";

import { useSession, signOut } from "next-auth/react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-heading font-semibold text-dark">Admin Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaUser className="text-xs" />
          <span>{session?.user?.name || "Admin"}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </header>
  );
}
