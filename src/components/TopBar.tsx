"use client";

import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface Settings {
  phone: string;
  email: string;
  headOffice: string;
}

export default function TopBar() {
  const [settings, setSettings] = useState<Settings>({
    phone: "014791891",
    email: "Balephi.energy@rmgroup.com.np",
    headOffice: "New Baneshwor, Kathmandu",
  });

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-dark text-slate-300 py-2 text-sm border-b border-slate-800 hidden md:block">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex space-x-6">
          <span className="flex items-center hover:text-white transition-colors">
            <FaPhone className="text-primaryLight mr-2 text-xs" /> {settings.phone}
          </span>
          <span className="flex items-center hover:text-white transition-colors">
            <FaEnvelope className="text-primaryLight mr-2 text-xs" /> {settings.email}
          </span>
          <span className="flex items-center hover:text-white transition-colors">
            <FaMapMarkerAlt className="text-primaryLight mr-2 text-xs" /> {settings.headOffice}
          </span>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://rmgroup.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs border border-primaryLight text-primaryLight hover:bg-primaryLight hover:text-white px-3 py-1 rounded-full transition-all"
          >
            Part of RM Group
          </a>
        </div>
      </div>
    </div>
  );
}
