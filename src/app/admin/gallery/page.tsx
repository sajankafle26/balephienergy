"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";

interface GalleryItem {
  _id?: string;
  url: string;
  caption: string;
  order: number;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = () => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setImages(data); })
      .catch(() => {});
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const { url } = await uploadRes.json();
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, caption, order: images.length + 1 }),
      });
      setCaption("");
      setMessage("Image uploaded successfully!");
      fetchImages();
    } catch { setMessage("Upload failed"); }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchImages();
    } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Manage Gallery</h1>
      {message && (
        <div className="px-4 py-3 rounded-lg text-sm mb-4 bg-green-50 text-green-600">{message}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-heading font-bold text-dark mb-4">Upload Image</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-dark mb-1">Caption</label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Image caption..." />
          </div>
          <label className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors cursor-pointer flex items-center gap-2">
            <FaUpload size={12} />
            {uploading ? "Uploading..." : "Select Image"}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="aspect-video bg-gray-200">
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 truncate">{img.caption || "No caption"}</p>
              <button onClick={() => img._id && handleDelete(img._id)} className="text-red-500 hover:text-red-600 shrink-0">
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
