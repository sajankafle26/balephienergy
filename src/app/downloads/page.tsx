"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaFilePdf, FaDownload, FaNewspaper, FaChartBar, FaUsers, FaFileContract, FaBook } from "react-icons/fa";

interface Download {
  _id: string;
  title: string;
  category: string;
  fileUrl: string;
  description: string;
  order: number;
}

const categories = [
  { key: "brochure", label: "Brochure", icon: FaBook },
  { key: "news", label: "News & Notices", icon: FaNewspaper },
  { key: "reports", label: "Quarterly Reports", icon: FaChartBar },
  { key: "agm", label: "AGM", icon: FaUsers },
  { key: "share-form", label: "Share Form", icon: FaFileContract },
  { key: "policies", label: "Company Policies", icon: FaFileContract },
];

const categoryColors: Record<string, string> = {
  brochure: "bg-blue-50 text-blue-700 border-blue-200",
  news: "bg-green-50 text-green-700 border-green-200",
  reports: "bg-purple-50 text-purple-700 border-purple-200",
  agm: "bg-amber-50 text-amber-700 border-amber-200",
  "share-form": "bg-pink-50 text-pink-700 border-pink-200",
  policies: "bg-slate-50 text-slate-700 border-slate-200",
};

function DownloadsContent() {
  const searchParams = useSearchParams();
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("brochure");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.some((c) => c.key === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/downloads?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setDownloads(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setDownloads([]);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <>
      <Navbar />
      <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-8">
            Downloads & <span className="text-primary">Documents</span>
          </h1>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat.key
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Documents List */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[30vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500">Loading documents...</p>
              </div>
            </div>
          ) : downloads.length === 0 ? (
            <div className="text-center py-16">
              <FaFilePdf className="mx-auto text-gray-300 text-5xl mb-4" />
              <p className="text-gray-500 text-lg">No documents in this category yet.</p>
              <p className="text-gray-400 text-sm mt-1">Documents can be added from the admin dashboard.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {downloads.map((doc) => (
                <div
                  key={doc._id}
                  className={`bg-white rounded-xl shadow-md p-5 flex items-center justify-between gap-4 hover:shadow-lg transition-all border ${
                    categoryColors[doc.category] || "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <FaFilePdf className="text-red-500 text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-dark text-lg truncate">{doc.title}</h3>
                      {doc.description && (
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{doc.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1 capitalize">
                        {doc.category.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <FaDownload size={14} />
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function DownloadsPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center min-h-[40vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500">Loading...</p>
              </div>
            </div>
          </main>
          <Footer />
        </>
      }
    >
      <DownloadsContent />
    </Suspense>
  );
}
