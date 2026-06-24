"use client";

import { useEffect, useState, useRef } from "react";
import { FaUpload, FaImage } from "react-icons/fa";

interface Settings {
  phone: string;
  email: string;
  headOffice: string;
  siteOffice: string;
  website: string;
  facebook: string;
  copyright: string;
  logo: string;
  favicon: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    phone: "", email: "", headOffice: "", siteOffice: "", website: "", facebook: "", copyright: "", logo: "/images/logo.jpeg", favicon: "/images/logo.jpeg",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);
  const faviconRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => { if (data) setSettings(data); })
      .catch(() => {});
  }, []);

  const handleUpload = async (field: "logo" | "favicon", file: File) => {
    setUploading(field);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setSettings((prev) => ({ ...prev, [field]: data.url }));
      }
    } catch { setMessage("Upload failed"); }
    setUploading(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setMessage("Saved successfully!");
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Site Settings</h1>
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* Logo & Favicon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Site Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                {settings.logo ? (
                  <img src={settings.logo} alt="Logo" className="w-full h-full object-contain p-1" />
                ) : (
                  <FaImage className="text-gray-400 text-2xl" />
                )}
              </div>
              <div className="flex-1">
                <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload("logo", file);
                }} />
                <button onClick={() => logoRef.current?.click()} disabled={uploading === "logo"} className="bg-primary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primaryLight disabled:opacity-50">
                  <FaUpload size={12} /> {uploading === "logo" ? "Uploading..." : "Upload Logo"}
                </button>
                <input value={settings.logo} onChange={(e) => setSettings({ ...settings, logo: e.target.value })} placeholder="/images/logo.jpeg" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-2" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Favicon</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                {settings.favicon ? (
                  <img src={settings.favicon} alt="Favicon" className="w-full h-full object-contain p-1" />
                ) : (
                  <FaImage className="text-gray-400 text-xl" />
                )}
              </div>
              <div className="flex-1">
                <input ref={faviconRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload("favicon", file);
                }} />
                <button onClick={() => faviconRef.current?.click()} disabled={uploading === "favicon"} className="bg-primary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primaryLight disabled:opacity-50">
                  <FaUpload size={12} /> {uploading === "favicon" ? "Uploading..." : "Upload Favicon"}
                </button>
                <input value={settings.favicon} onChange={(e) => setSettings({ ...settings, favicon: e.target.value })} placeholder="/images/logo.jpeg" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Phone Number</label>
            <input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Email</label>
            <input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Head Office Address</label>
          <input value={settings.headOffice} onChange={(e) => setSettings({ ...settings, headOffice: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Site Office Address</label>
          <input value={settings.siteOffice} onChange={(e) => setSettings({ ...settings, siteOffice: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Website URL</label>
            <input value={settings.website} onChange={(e) => setSettings({ ...settings, website: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Facebook URL</label>
            <input value={settings.facebook} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Copyright Text</label>
          <input value={settings.copyright} onChange={(e) => setSettings({ ...settings, copyright: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
