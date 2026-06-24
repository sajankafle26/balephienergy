"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface Hero {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  backgroundImage: string;
}

export default function AdminHero() {
  const [hero, setHero] = useState<Hero>({
    badge: "", title: "", titleHighlight: "", subtitle: "",
    ctaPrimaryText: "", ctaPrimaryLink: "", ctaSecondaryText: "", ctaSecondaryLink: "",
    backgroundImage: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => { if (data && data._id) setHero(data); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });
      setMessage("Saved successfully!");
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Edit Hero Section</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Badge Text</label>
            <input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Title Highlight Word</label>
            <input value={hero.titleHighlight} onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Title</label>
          <input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Subtitle</label>
          <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Primary CTA Text</label>
            <input value={hero.ctaPrimaryText} onChange={(e) => setHero({ ...hero, ctaPrimaryText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Primary CTA Link</label>
            <input value={hero.ctaPrimaryLink} onChange={(e) => setHero({ ...hero, ctaPrimaryLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Secondary CTA Text</label>
            <input value={hero.ctaSecondaryText} onChange={(e) => setHero({ ...hero, ctaSecondaryText: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Secondary CTA Link</label>
            <input value={hero.ctaSecondaryLink} onChange={(e) => setHero({ ...hero, ctaSecondaryLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Background Image</label>
          <ImageUploader currentImage={hero.backgroundImage} onUpload={(url) => setHero({ ...hero, backgroundImage: url })} />
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
