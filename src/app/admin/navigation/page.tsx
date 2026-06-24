"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaGripVertical, FaChevronDown, FaChevronRight } from "react-icons/fa";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export default function AdminNavigation() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items) setItems(data.items);
      })
      .catch(() => {});
  }, []);

  const addTopLevel = () => {
    setItems([...items, { label: "New Menu", href: "/", children: [] }]);
  };

  const addChild = (parentIndex: number) => {
    const updated = [...items];
    if (!updated[parentIndex].children) updated[parentIndex].children = [];
    updated[parentIndex].children!.push({ label: "New Submenu", href: "/" });
    setItems(updated);
  };

  const updateItem = (path: number[], field: keyof MenuItem, value: string) => {
    const updated = JSON.parse(JSON.stringify(items));
    let current: any = updated;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }
    current[path[path.length - 1]][field] = value;
    setItems(updated);
  };

  const removeItem = (path: number[]) => {
    const updated = JSON.parse(JSON.stringify(items));
    if (path.length === 1) {
      updated.splice(path[0], 1);
    } else {
      let current: any = updated;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]].children;
      }
      current.splice(path[path.length - 1], 1);
    }
    setItems(updated);
  };

  const moveItem = (path: number[], direction: "up" | "down") => {
    const updated = JSON.parse(JSON.stringify(items));
    if (path.length === 1) {
      const idx = path[0];
      if (direction === "up" && idx > 0) {
        [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
      } else if (direction === "down" && idx < updated.length - 1) {
        [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
      }
    } else {
      let parent: any = updated;
      for (let i = 0; i < path.length - 1; i++) {
        parent = parent[path[i]].children;
      }
      const idx = path[path.length - 1];
      if (direction === "up" && idx > 0) {
        [parent[idx - 1], parent[idx]] = [parent[idx], parent[idx - 1]];
      } else if (direction === "down" && idx < parent.length - 1) {
        [parent[idx], parent[idx + 1]] = [parent[idx + 1], parent[idx]];
      }
    }
    setItems(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await fetch("/api/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      setMessage("Menu saved successfully!");
    } catch {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  const toggleExpand = (idx: number) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const renderItem = (item: MenuItem, path: number[], depth: number = 0) => {
    const key = path.join("-");
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded[path[0]] ?? false;

    return (
      <div key={key} className={`${depth > 0 ? "ml-6 mt-2" : "mb-3"}`}>
        <div className={`flex items-center gap-2 p-3 rounded-lg border ${
          depth === 0 ? "bg-white border-gray-200" : "bg-gray-50 border-gray-100"
        }`}>
          <FaGripVertical className="text-gray-300 cursor-move shrink-0" />

          {depth === 0 && (
            <button onClick={() => toggleExpand(path[0])} className="text-gray-400 hover:text-gray-600 shrink-0">
              {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
            </button>
          )}

          <input
            value={item.label}
            onChange={(e) => updateItem(path, "label", e.target.value)}
            className="flex-1 min-w-0 px-3 py-1.5 border border-gray-300 rounded text-sm"
            placeholder="Label"
          />

          <input
            value={item.href}
            onChange={(e) => updateItem(path, "href", e.target.value)}
            className="flex-1 min-w-0 px-3 py-1.5 border border-gray-300 rounded text-sm"
            placeholder="Link (e.g. /about)"
          />

          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => moveItem(path, "up")} className="text-gray-400 hover:text-gray-600 text-xs px-1" title="Move up">▲</button>
            <button onClick={() => moveItem(path, "down")} className="text-gray-400 hover:text-gray-600 text-xs px-1" title="Move down">▼</button>
            {depth === 0 && (
              <button onClick={() => addChild(path[0])} className="text-primary hover:text-primaryLight text-xs px-1" title="Add submenu">
                <FaPlus size={10} />
              </button>
            )}
            <button onClick={() => removeItem(path)} className="text-red-400 hover:text-red-600 px-1" title="Delete">
              <FaTrash size={12} />
            </button>
          </div>
        </div>

        {depth === 0 && isExpanded && hasChildren && (
          <div className="border-l-2 border-primary/20 ml-4">
            {item.children!.map((child, childIdx) =>
              renderItem(child, [...path, childIdx], depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Manage Navigation Menu</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm mb-4 ${message.includes("Failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-bold text-dark">Menu Items</h2>
          <button onClick={addTopLevel} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors flex items-center gap-2">
            <FaPlus size={12} /> Add Menu Item
          </button>
        </div>

        <div className="space-y-1">
          {items.map((item, idx) => renderItem(item, [idx]))}
        </div>

        {items.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">No menu items yet. Click "Add Menu Item" to start.</p>
        )}
      </div>

      <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primaryLight transition-colors disabled:opacity-50">
        {saving ? "Saving..." : "Save Menu"}
      </button>
    </div>
  );
}
