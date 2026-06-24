"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProjectData {
  projectName: string;
  features: { key: string; value: string }[];
  status: string;
  completedItems: string[];
  inProgressItems: string[];
  siteAccess: string;
  route: string;
  pdfUrl: string;
}

export default function ProjectPage() {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center min-h-[40vh]">
            <p className="text-gray-500 text-lg">Loading project details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <TopBar />
        <Navbar />
        <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center min-h-[40vh]">
            <p className="text-gray-500 text-lg">Failed to load project details.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
            Project <span className="text-primary">Details</span>
          </h1>

          {project.features && project.features.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-heading font-bold text-dark mb-6">Technical Features</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Specification</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.features.map((f, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-6 py-3 text-sm font-medium text-dark">{f.key}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{f.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-heading font-bold text-dark mb-6">Project Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.completedItems && project.completedItems.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-heading font-bold text-green-700 mb-4">Completed</h3>
                  <ul className="space-y-2">
                    {project.completedItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.inProgressItems && project.inProgressItems.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-heading font-bold text-amber-700 mb-4">In Progress</h3>
                  <ul className="space-y-2">
                    {project.inProgressItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-amber-500 mt-0.5">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {(project.siteAccess || project.route) && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-dark mb-6">Site Access</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                {project.siteAccess && (
                  <p className="text-gray-600 mb-2">
                    <strong>Distance:</strong> {project.siteAccess}
                  </p>
                )}
                {project.route && (
                  <p className="text-gray-600">
                    <strong>Route:</strong> {project.route}
                  </p>
                )}
              </div>
            </div>
          )}

          {project.pdfUrl && (
            <div className="max-w-4xl mx-auto mt-12">
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Download Project PDF
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
