"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import ImageUploader from "@/components/admin/ImageUploader";

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  category: "board" | "management";
  bio: string;
  image: string;
  order: number;
}

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<TeamMember>({ name: "", role: "", category: "board", bio: "", image: "", order: 0 });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setMembers(data); })
      .catch(() => {});
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      if (editing) {
        await fetch("/api/team", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setMessage("Saved successfully!");
      setEditing(null);
      setForm({ name: "", role: "", category: "board", bio: "", image: "", order: 0 });
      fetchMembers();
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await fetch("/api/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchMembers();
    } catch {}
  };

  const handleEdit = (member: TeamMember) => {
    setEditing(member);
    setForm(member);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Manage Team Members</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-heading font-bold text-dark mb-4">{editing ? "Edit Member" : "Add New Member"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Role *</label>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as "board" | "management" })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="board">Board of Directors</option>
              <option value="management">Core Management</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-dark mb-1">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-dark mb-1">Photo</label>
            <ImageUploader currentImage={form.image} onUpload={(url) => setForm({ ...form, image: url })} />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
            {saving ? "Saving..." : editing ? "Update" : "Add Member"}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ name: "", role: "", category: "board", bio: "", image: "", order: 0 }); }} className="bg-gray-200 text-dark px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((member) => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-dark">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.category === "board" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    {member.category === "board" ? "Board" : "Management"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(member)} className="text-blue-500 hover:text-blue-600"><FaEdit size={14} /></button>
                    <button onClick={() => member._id && handleDelete(member._id)} className="text-red-500 hover:text-red-600"><FaTrash size={14} /></button>
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
