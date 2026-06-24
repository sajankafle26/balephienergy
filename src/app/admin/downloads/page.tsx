"use client";

import { useEffect, useState, useRef } from "react";
import { FaPlus, FaTrash, FaEdit, FaUpload, FaFilePdf, FaSave, FaTimes } from "react-icons/fa";

interface Download {
  _id?: string;
  title: string;
  category: string;
  fileUrl: string;
  description: string;
  order: number;
}

const categories = [
  { key: "brochure", label: "Brochure" },
  { key: "news", label: "News & Notices" },
  { key: "reports", label: "Quarterly Reports" },
  { key: "agm", label: "AGM" },
  { key: "share-form", label: "Share Form" },
  { key: "policies", label: "Company Policies" },
];

const emptyDoc: Download = { title: "", category: "brochure", fileUrl: "", description: "", order: 0 };

export default function AdminDownloads() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Download | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const fetchDownloads = () => {
    const url = filterCategory === "all" ? "/api/downloads" : `/api/downloads?category=${filterCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => { setDownloads(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchDownloads(); }, [filterCategory]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) return data.url;
    } catch { setMessage("Upload failed"); }
    setUploading(false);
    return null;
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage("");
    try {
      if (editing._id) {
        await fetch("/api/downloads", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      } else {
        await fetch("/api/downloads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      }
      setMessage("Saved successfully!");
      setEditing(null);
      setIsCreating(false);
      fetchDownloads();
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      await fetch("/api/downloads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchDownloads();
    } catch { setMessage("Failed to delete"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark">Downloads & Documents</h1>
        <button
          onClick={() => { setEditing({ ...emptyDoc }); setIsCreating(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primaryLight"
        >
          <FaPlus size={12} /> Add Document
        </button>
      </div>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setFilterCategory("all")} className={`px-3 py-1.5 rounded-lg text-sm border ${filterCategory === "all" ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200"}`}>
          All
        </button>
        {categories.map((cat) => (
          <button key={cat.key} onClick={() => setFilterCategory(cat.key)} className={`px-3 py-1.5 rounded-lg text-sm border ${filterCategory === cat.key ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200"}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Edit/Create Form */}
      {editing && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-primary">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-bold text-dark">{isCreating ? "Add New Document" : "Edit Document"}</h2>
            <button onClick={() => { setEditing(null); setIsCreating(false); }} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Title *</label>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Category *</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">Description</label>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">File *</label>
              <div className="flex gap-2">
                <input value={editing.fileUrl} onChange={(e) => setEditing({ ...editing, fileUrl: e.target.value })} placeholder="/uploads/file.pdf or https://..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await handleUpload(file);
                  if (url) setEditing((prev) => prev ? { ...prev, fileUrl: url } : null);
                }} />
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-200 disabled:opacity-50">
                  <FaUpload size={12} /> {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-dark mb-1">Order</label>
              <input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight disabled:opacity-50 flex items-center gap-2">
                <FaSave size={14} /> {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => { setEditing(null); setIsCreating(false); }} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : downloads.length === 0 ? (
        <div className="text-center py-12">
          <FaFilePdf className="mx-auto text-gray-300 text-4xl mb-3" />
          <p className="text-gray-500">No documents yet. Click &quot;Add Document&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {downloads.map((doc) => (
            <div key={doc._id} className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center shrink-0">
                <FaFilePdf className="text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-dark text-sm truncate">{doc.title}</h3>
                <p className="text-xs text-gray-400 capitalize">{doc.category.replace("-", " ")} {doc.description && `• ${doc.description}`}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">View</a>
                <button onClick={() => { setEditing(doc); setIsCreating(false); }} className="text-gray-400 hover:text-primary"><FaEdit size={14} /></button>
                <button onClick={() => doc._id && handleDelete(doc._id)} className="text-gray-400 hover:text-red-500"><FaTrash size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
