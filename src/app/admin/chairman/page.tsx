"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface Chairman {
  name: string;
  title: string;
  message: string;
  image: string;
}

export default function AdminChairman() {
  const [chairman, setChairman] = useState<Chairman>({ name: "", title: "", message: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/chairman")
      .then((res) => res.json())
      .then((data) => { if (data && data._id) setChairman(data); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/chairman", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chairman),
      });
      setMessage("Saved successfully!");
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Edit Chairman Message</h1>
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Name</label>
            <input value={chairman.name} onChange={(e) => setChairman({ ...chairman, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Title</label>
            <input value={chairman.title} onChange={(e) => setChairman({ ...chairman, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Message</label>
          <textarea value={chairman.message} onChange={(e) => setChairman({ ...chairman, message: e.target.value })} rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Photo</label>
          <ImageUploader currentImage={chairman.image} onUpload={(url) => setChairman({ ...chairman, image: url })} />
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
