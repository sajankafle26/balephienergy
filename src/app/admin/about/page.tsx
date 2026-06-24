"use client";

import { useEffect, useState, useRef } from "react";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";

interface Milestone {
  text: string;
  date: string;
}

interface About {
  title: string;
  description: string;
  additionalText: string;
  milestones: Milestone[];
  images: string[];
}

export default function AdminAbout() {
  const [about, setAbout] = useState<About>({
    title: "", description: "", additionalText: "", milestones: [], images: [],
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => { if (data && data._id) setAbout(data); })
      .catch(() => {});
  }, []);

  const handleUpload = async (idx: number, file: File) => {
    setUploadingIdx(idx);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        const updated = [...about.images];
        updated[idx] = data.url;
        setAbout({ ...about, images: updated });
      }
    } catch { setMessage("Upload failed"); }
    setUploadingIdx(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      setMessage("Saved successfully!");
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Edit About Content</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Title</label>
          <input value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Description</label>
          <textarea value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Additional Text</label>
          <textarea value={about.additionalText} onChange={(e) => setAbout({ ...about, additionalText: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>

        {/* Milestones */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-dark">Milestones</label>
            <button onClick={() => setAbout({ ...about, milestones: [...about.milestones, { text: "", date: "" }] })} className="text-primary text-sm flex items-center gap-1 hover:underline">
              <FaPlus size={10} /> Add Milestone
            </button>
          </div>
          <div className="space-y-2">
            {about.milestones.map((m, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={m.text} onChange={(e) => {
                  const updated = [...about.milestones];
                  updated[i].text = e.target.value;
                  setAbout({ ...about, milestones: updated });
                }} placeholder="Milestone text" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <input value={m.date} onChange={(e) => {
                  const updated = [...about.milestones];
                  updated[i].date = e.target.value;
                  setAbout({ ...about, milestones: updated });
                }} placeholder="Date" className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <button onClick={() => setAbout({ ...about, milestones: about.milestones.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-600">
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* About Section Images */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-dark">About Section Images (4 images, right side grid)</label>
            {about.images.length < 4 && (
              <button onClick={() => setAbout({ ...about, images: [...about.images, ""] })} className="text-primary text-sm flex items-center gap-1 hover:underline">
                <FaPlus size={10} /> Add Image
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {about.images.map((img, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Image {i + 1}</span>
                  <div className="flex items-center gap-2">
                    <input ref={(el) => { fileRefs.current[i] = el; }} type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(i, file);
                    }} />
                    <button onClick={() => fileRefs.current[i]?.click()} disabled={uploadingIdx === i} className="text-primary text-xs flex items-center gap-1 hover:underline disabled:opacity-50">
                      <FaUpload size={10} /> {uploadingIdx === i ? "Uploading..." : "Upload"}
                    </button>
                    <button onClick={() => setAbout({ ...about, images: about.images.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-600">
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
                {img && (
                  <img src={img} alt={`About image ${i + 1}`} className="w-full h-32 object-cover rounded-lg" />
                )}
                <input value={img} onChange={(e) => {
                  const updated = [...about.images];
                  updated[i] = e.target.value;
                  setAbout({ ...about, images: updated });
                }} placeholder="Image URL" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
