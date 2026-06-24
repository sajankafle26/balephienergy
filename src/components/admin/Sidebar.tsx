"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaImage, FaUsers, FaProjectDiagram, FaEnvelope, FaCog, FaHome, FaBullhorn, FaUserTie, FaLayerGroup, FaBars, FaChartBar, FaDownload } from "react-icons/fa";

const links = [
  { label: "Dashboard", href: "/admin", icon: FaTachometerAlt },
  { label: "Hero Section", href: "/admin/hero", icon: FaHome },
  { label: "Statistics", href: "/admin/stats", icon: FaChartBar },
  { label: "About", href: "/admin/about", icon: FaBullhorn },
  { label: "Team Members", href: "/admin/team", icon: FaUsers },
  { label: "Project Details", href: "/admin/project", icon: FaProjectDiagram },
  { label: "Chairman Message", href: "/admin/chairman", icon: FaUserTie },
  { label: "Downloads", href: "/admin/downloads", icon: FaDownload },
  { label: "RM Group Projects", href: "/admin/rmgroup", icon: FaLayerGroup },
  { label: "Gallery", href: "/admin/gallery", icon: FaImage },
  { label: "Navigation Menu", href: "/admin/navigation", icon: FaBars },
  { label: "Contact Submissions", href: "/admin/contact", icon: FaEnvelope },
  { label: "Site Settings", href: "/admin/settings", icon: FaCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-dark text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-bold text-sm">BE</span>
          </div>
          <div>
            <h1 className="font-heading font-bold text-sm">Balephi Energy</h1>
            <p className="text-[10px] text-gray-400">Admin Dashboard</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <link.icon className="text-sm" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          View Website
        </Link>
      </div>
    </aside>
  );
}
