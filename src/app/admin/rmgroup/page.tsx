"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

interface RMProject {
  _id?: string;
  category: string;
  name: string;
  capacity: string;
  description: string;
  highlighted: boolean;
  order: number;
}

interface RMGroupContent {
  subtitle: string;
  title: string;
  description: string;
}

export default function AdminRMGroup() {
  const [content, setContent] = useState<RMGroupContent>({
    subtitle: "Affiliated With",
    title: "RM Group Energy Sector Involvement",
    description: "",
  });
  const [projects, setProjects] = useState<RMProject[]>([]);
  const [editing, setEditing] = useState<RMProject | null>(null);
  const [form, setForm] = useState<RMProject>({ category: "revenue", name: "", capacity: "", description: "", highlighted: false, order: 0 });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/rmgroup-content")
      .then((res) => res.json())
      .then((data) => { if (data && data._id) setContent(data); })
      .catch(() => {});

    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("/api/rmgroup")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setProjects(data); })
      .catch(() => {});
  };

  const handleSaveContent = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/rmgroup-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setMessage("Section header saved!");
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  const handleSaveProject = async () => {
    setSaving(true);
    setMessage("");
    try {
      if (editing) {
        await fetch("/api/rmgroup", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/rmgroup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setMessage("Project saved!");
      setEditing(null);
      setForm({ category: "revenue", name: "", capacity: "", description: "", highlighted: false, order: 0 });
      fetchProjects();
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch("/api/rmgroup", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchProjects();
    } catch {}
  };

  const categoryLabels: Record<string, string> = {
    revenue: "Revenue Generating",
    construction: "Under Construction",
    study: "Under Study",
    upcoming: "Upcoming",
  };

  const categoryColors: Record<string, string> = {
    revenue: "bg-green-100 text-green-700",
    construction: "bg-amber-100 text-amber-700",
    study: "bg-blue-100 text-blue-700",
    upcoming: "bg-purple-100 text-purple-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Manage RM Group Section</h1>
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}

      {/* Section Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-heading font-bold text-dark mb-4">Section Header</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Subtitle (e.g. &quot;Affiliated With&quot;)</label>
            <input value={content.subtitle} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Title</label>
            <input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-dark mb-1">Description</label>
          <textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <button onClick={handleSaveContent} disabled={saving} className="mt-4 bg-secondary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Header"}
        </button>
      </div>

      {/* Add/Edit Project */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-heading font-bold text-dark mb-4">{editing ? "Edit Project" : "Add New Project"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Capacity</label>
            <input value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="revenue">Revenue Generating</option>
              <option value="construction">Under Construction</option>
              <option value="study">Under Study</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" checked={form.highlighted} onChange={(e) => setForm({ ...form, highlighted: e.target.checked })} className="rounded" />
            <label className="text-sm text-dark">Highlighted (Balephi)</label>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSaveProject} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
            {saving ? "Saving..." : editing ? "Update" : "Add Project"}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ category: "revenue", name: "", capacity: "", description: "", highlighted: false, order: 0 }); }} className="bg-gray-200 text-dark px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((p) => (
              <tr key={p._id} className={`hover:bg-gray-50 ${p.highlighted ? "bg-primary/5" : ""}`}>
                <td className="px-6 py-4 text-sm font-medium text-dark">{p.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.capacity}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[p.category] || ""}`}>
                    {categoryLabels[p.category] || p.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(p); setForm(p); }} className="text-blue-500 hover:text-blue-600"><FaEdit size={14} /></button>
                    <button onClick={() => p._id && handleDelete(p._id)} className="text-red-500 hover:text-red-600"><FaTrash size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
