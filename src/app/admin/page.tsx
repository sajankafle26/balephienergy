"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUsers, FaImage, FaEnvelope, FaProjectDiagram, FaBullhorn, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    teamCount: 0,
    galleryCount: 0,
    contactCount: 0,
    unreadCount: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/team").then((r) => r.json()),
      fetch("/api/gallery").then((r) => r.json()),
      fetch("/api/contact", { headers: { "Content-Type": "application/json" } }).then((r) => r.json()),
    ]).then(([team, gallery, contacts]) => {
      setStats({
        teamCount: Array.isArray(team) ? team.length : 0,
        galleryCount: Array.isArray(gallery) ? gallery.length : 0,
        contactCount: Array.isArray(contacts) ? contacts.length : 0,
        unreadCount: Array.isArray(contacts) ? contacts.filter((c: { read: boolean }) => !c.read).length : 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: "Team Members", value: stats.teamCount, icon: FaUsers, href: "/admin/team", color: "bg-blue-500" },
    { label: "Gallery Images", value: stats.galleryCount, icon: FaImage, href: "/admin/gallery", color: "bg-green-500" },
    { label: "Contact Submissions", value: stats.contactCount, icon: FaEnvelope, href: "/admin/contact", color: "bg-purple-500" },
    { label: "Unread Messages", value: stats.unreadCount, icon: FaEnvelope, href: "/admin/contact", color: "bg-amber-500" },
  ];

  const quickLinks = [
    { label: "Edit Hero Section", href: "/admin/hero", icon: FaBullhorn },
    { label: "Edit Project Details", href: "/admin/project", icon: FaProjectDiagram },
    { label: "Manage Team", href: "/admin/team", icon: FaUsers },
    { label: "Site Settings", href: "/admin/settings", icon: FaCog },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                <card.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-heading font-bold text-dark mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <link.icon className="text-primary" size={18} />
            <span className="text-sm font-medium text-dark">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
