"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Stat {
  value: string;
  unit: string;
  label: string;
  order: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setStats(data); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats }),
      });
      setMessage("Saved successfully!");
    } catch { setMessage("Failed to save"); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark">Edit Statistics</h1>
        <button
          onClick={() => setStats([...stats, { value: "", unit: "", label: "", order: stats.length }])}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primaryLight"
        >
          <FaPlus size={12} /> Add Stat
        </button>
      </div>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
              <input
                value={stat.value}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[i].value = e.target.value;
                  setStats(updated);
                }}
                placeholder="e.g. 40.03"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="w-24">
              <label className="block text-xs font-medium text-gray-500 mb-1">Unit</label>
              <input
                value={stat.unit}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[i].unit = e.target.value;
                  setStats(updated);
                }}
                placeholder="e.g. MW"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
              <input
                value={stat.label}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[i].label = e.target.value;
                  setStats(updated);
                }}
                placeholder="e.g. Installed Capacity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="w-16">
              <label className="block text-xs font-medium text-gray-500 mb-1">Order</label>
              <input
                type="number"
                value={stat.order}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[i].order = parseInt(e.target.value) || 0;
                  setStats(updated);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <button
              onClick={() => setStats(stats.filter((_, j) => j !== i))}
              className="text-red-500 hover:text-red-600 p-2"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>

      {stats.length > 0 && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}
    </div>
  );
}
