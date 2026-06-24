"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaGlobe,
  FaAngleRight,
  FaBuilding,
  FaMapPin,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

interface Settings {
  phone: string;
  email: string;
  headOffice: string;
  siteOffice: string;
  website: string;
  copyright: string;
  logo: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    phone: "014791891",
    email: "Balephi.energy@rmgroup.com.np",
    headOffice: "New Baneshwor, Kathmandu-10",
    siteOffice: "Jugal Rural Municipality, Sindhupalchowk",
    website: "https://rmgroup.com.np/",
    copyright: "© 2026 Balephi Energy Pvt. Ltd. All rights reserved.",
    logo: "/images/logo.jpeg",
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
    <footer className="bg-dark pt-20 pb-8 border-t-[6px] border-primary mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src={settings.logo}
                alt="Balephi Energy Logo"
                width={48}
                height={48}
                className="h-12 w-auto bg-white rounded p-1"
              />
              <h3 className="text-2xl font-bold text-white tracking-tight font-heading">
                Balephi Energy
              </h3>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              A proud entity of the RM Group, developing the 40MW Balephi Khola
              Hydroelectric Project in Sindhupalchowk.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaFacebookF />
              </a>
              <a
                href={settings.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                title="RM Group"
              >
                <FaGlobe />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative inline-block pb-2 font-heading">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About BEPL", href: "/about" },
                { label: "Balephi Khola HEP", href: "/project" },
                { label: "RM Group Projects", href: "/rmgroup" },
                { label: "Management Team", href: "/team" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primaryLight transition-colors flex items-center"
                  >
                    <FaAngleRight className="text-xs mr-2" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative inline-block pb-2 font-heading">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start text-slate-400">
                <FaBuilding className="mt-1.5 mr-3 text-primaryLight shrink-0" />
                <span>
                  <strong>Head Office:</strong>
                  <br />
                  {settings.headOffice}
                </span>
              </li>
              <li className="flex items-start text-slate-400">
                <FaMapPin className="mt-1.5 mr-3 text-primaryLight shrink-0" />
                <span>
                  <strong>Site Office:</strong>
                  <br />
                  {settings.siteOffice}
                </span>
              </li>
              <li className="flex items-center text-slate-400">
                <FaPhone className="mr-3 text-primaryLight shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center text-slate-400 text-sm">
                <FaEnvelope className="mr-3 text-primaryLight shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm text-center md:text-left mb-4 md:mb-0">
            {settings.copyright}
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href={settings.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              RM Group Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
