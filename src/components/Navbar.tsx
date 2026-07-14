"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaChevronDown } from "react-icons/fa";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const defaultMenu: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "#",
    children: [
      { label: "Chairman Message", href: "/chairman" },
      { label: "Board of Directors", href: "/team" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Project Update", href: "/project" },
  {
    label: "RM Group",
    href: "#",
    children: [
      { label: "RM Group Projects", href: "/rmgroup" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenu);
  const [mobileExpanded, setMobileExpanded] = useState<Record<number, boolean>>({});
  const [logo, setLogo] = useState("/images/logo.jpeg");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          setMenuItems(data.items);
        }
      })
      .catch(() => {});
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.logo) setLogo(data.logo);
      })
      .catch(() => {});
  }, []);

  const toggleMobileExpand = (idx: number) => {
    setMobileExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const isActive = (href: string) => pathname === href;
  const hasActiveChild = (item: MenuItem) =>
    item.children?.some((child) => pathname === child.href);

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-md" : "py-4 shadow-sm"
      }`}
      id="navbar"
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src={logo}
            alt="Balephi Energy Logo"
            width={56}
            height={56}
            className="h-14 w-auto group-hover:scale-105 transition-transform"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-800 leading-none tracking-tight">
              Balephi Energy
            </h1>
            <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase mt-1">
              Pvt. Ltd.
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-slate-600">
          {menuItems.map((item, idx) =>
            item.children && item.children.length > 0 ? (
              <div key={idx} className="relative group">
                <a
                  href={item.href === "#" ? "#" : item.href}
                  className={`nav-link transition-colors flex items-center ${
                    hasActiveChild(item) ? "text-primary font-semibold" : "hover:text-primary"
                  }`}
                >
                  {item.label}{" "}
                  <FaChevronDown className="text-[10px] ml-1.5 opacity-70" />
                </a>
                <div className="dropdown-menu">
                  {item.children.map((child, childIdx) => (
                    <Link
                      key={childIdx}
                      href={child.href}
                      className={`dropdown-item ${
                        isActive(child.href) ? "text-primary font-semibold bg-primary/5" : ""
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={idx}
                href={item.href}
                className={`nav-link transition-colors ${
                  isActive(item.href) ? "text-primary font-semibold" : "hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/project"
            className="bg-primary hover:bg-primaryLight text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
          >
            40MW Project
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-slate-600 hover:text-primary transition-colors focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${
          mobileOpen ? "" : "hidden"
        } bg-white border-t border-slate-100 absolute w-full shadow-lg`}
      >
        <div className="flex flex-col px-4 py-4 space-y-1">
          {menuItems.map((item, idx) =>
            item.children && item.children.length > 0 ? (
              <div key={idx} className="border-b border-slate-100 pb-2">
                <button
                  onClick={() => toggleMobileExpand(idx)}
                  className={`font-semibold mb-2 flex items-center justify-between w-full text-left ${
                    hasActiveChild(item) ? "text-primary" : "text-slate-600"
                  }`}
                >
                  {item.label}
                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      mobileExpanded[idx] ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpanded[idx] && (
                  <div className="flex flex-col pl-4 space-y-2 text-sm">
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={childIdx}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`transition-colors ${
                          isActive(child.href)
                            ? "text-primary font-semibold"
                            : "text-slate-500 hover:text-primary"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`border-b border-slate-100 pb-2 font-medium transition-colors ${
                  isActive(item.href) ? "text-primary" : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
