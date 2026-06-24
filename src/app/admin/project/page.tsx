"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";

interface Feature {
  key: string;
  value: string;
}

interface Project {
  projectName: string;
  features: Feature[];
  status: string;
  completedItems: string[];
  inProgressItems: string[];
  siteAccess: string;
  route: string;
  pdfUrl: string;
}

export default function AdminProject() {
  const [project, setProject] = useState<Project>({
    projectName: "",
    features: [],
    status: "",
    completedItems: [],
    inProgressItems: [],
    siteAccess: "",
    route: "",
    pdfUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setProject(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/project", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      setMessage("Saved successfully!");
    } catch {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Edit Project Details</h1>
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Project Name</label>
            <input value={project.projectName} onChange={(e) => setProject({ ...project, projectName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Status</label>
            <input value={project.status} onChange={(e) => setProject({ ...project, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-dark">Technical Features</label>
            <button onClick={() => setProject({ ...project, features: [...project.features, { key: "", value: "" }] })} className="text-primary text-sm flex items-center gap-1 hover:underline">
              <FaPlus size={10} /> Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {project.features.map((f, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={f.key} onChange={(e) => {
                  const updated = [...project.features];
                  updated[i].key = e.target.value;
                  setProject({ ...project, features: updated });
                }} placeholder="Specification" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <input value={f.value} onChange={(e) => {
                  const updated = [...project.features];
                  updated[i].value = e.target.value;
                  setProject({ ...project, features: updated });
                }} placeholder="Value" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <button onClick={() => setProject({ ...project, features: project.features.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-600">
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-dark">Completed Items</label>
            <button onClick={() => setProject({ ...project, completedItems: [...project.completedItems, ""] })} className="text-primary text-sm flex items-center gap-1 hover:underline">
              <FaPlus size={10} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {project.completedItems.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={item} onChange={(e) => {
                  const updated = [...project.completedItems];
                  updated[i] = e.target.value;
                  setProject({ ...project, completedItems: updated });
                }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <button onClick={() => setProject({ ...project, completedItems: project.completedItems.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-600">
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-dark">In Progress Items</label>
            <button onClick={() => setProject({ ...project, inProgressItems: [...project.inProgressItems, ""] })} className="text-primary text-sm flex items-center gap-1 hover:underline">
              <FaPlus size={10} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {project.inProgressItems.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={item} onChange={(e) => {
                  const updated = [...project.inProgressItems];
                  updated[i] = e.target.value;
                  setProject({ ...project, inProgressItems: updated });
                }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <button onClick={() => setProject({ ...project, inProgressItems: project.inProgressItems.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-600">
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Site Access</label>
            <input value={project.siteAccess} onChange={(e) => setProject({ ...project, siteAccess: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Route</label>
            <input value={project.route} onChange={(e) => setProject({ ...project, route: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Salient Features PDF</label>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <input value={project.pdfUrl} onChange={(e) => setProject({ ...project, pdfUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" placeholder="PDF URL or uploaded file path" />
            </div>
            <label className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors cursor-pointer flex items-center gap-2 shrink-0">
              <FaUpload size={12} />
              Upload PDF
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append("file", file);
                  try {
                    const res = await fetch("/api/upload", { method: "POST", body: formData });
                    const data = await res.json();
                    if (data.url) setProject({ ...project, pdfUrl: data.url });
                  } catch {}
                }}
              />
            </label>
          </div>
          {project.pdfUrl && (
            <p className="text-xs text-gray-500 mt-1">Current: <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{project.pdfUrl}</a></p>
          )}
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
