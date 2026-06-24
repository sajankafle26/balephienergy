"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";

interface Submission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContact() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => { fetchSubmissions(); }, []);

  const fetchSubmissions = () => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setSubmissions(data); })
      .catch(() => {});
  };

  const toggleRead = async (sub: Submission) => {
    try {
      await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sub._id, read: !sub.read }),
      });
      fetchSubmissions();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchSubmissions();
    } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-dark mb-6">Contact Submissions</h1>
      {message && <div className="px-4 py-3 rounded-lg text-sm mb-4 bg-green-50 text-green-600">{message}</div>}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {submissions.map((sub) => (
              <tr key={sub._id} className={`hover:bg-gray-50 ${!sub.read ? "bg-blue-50/50" : ""}`}>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-dark">{sub.name}</p>
                  <p className="text-xs text-gray-500">{sub.email}</p>
                  {sub.phone && <p className="text-xs text-gray-500">{sub.phone}</p>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{sub.message}</td>
                <td className="px-6 py-4 text-xs text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => toggleRead(sub)} className="text-blue-500 hover:text-blue-600" title={sub.read ? "Mark unread" : "Mark read"}>
                      {sub.read ? <FaEnvelope size={14} /> : <FaEnvelopeOpen size={14} />}
                    </button>
                    <button onClick={() => handleDelete(sub._id)} className="text-red-500 hover:text-red-600">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">No submissions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
