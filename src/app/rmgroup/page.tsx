"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Project {
  name: string;
  capacity: string;
  description: string;
  highlighted: boolean;
  order: number;
}

interface Content {
  subtitle: string;
  title: string;
  description: string;
}

interface CategoryGroup {
  category: string;
  projects: Project[];
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  revenue: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  construction: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  study: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  upcoming: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

const categoryLabels: Record<string, string> = {
  revenue: "Revenue Generating",
  construction: "Under Construction",
  study: "Under Study",
  upcoming: "Upcoming",
};

export default function RMGroupPage() {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/rmgroup").then((res) => res.json()),
      fetch("/api/rmgroup-content").then((res) => res.json()),
    ]).then(([projects, contentData]) => {
      const map = new Map<string, Project[]>();
      for (const p of projects) {
        if (!map.has(p.category)) map.set(p.category, []);
        map.get(p.category)!.push(p);
      }
      const ordered: CategoryGroup[] = ["revenue", "construction", "study", "upcoming"]
        .filter((c) => map.has(c))
        .map((c) => ({
          category: c,
          projects: map.get(c)!.sort((a, b) => a.order - b.order),
        }));
      setGroups(ordered);
      setContent(contentData);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-4">
                {content?.title ?? "RM Group"} <span className="text-primary">Projects</span>
              </h1>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                {content?.description ?? ""}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {groups.map((group) => {
                  const colors = colorMap[group.category];
                  return (
                    <div key={group.category} className={`rounded-xl border ${colors.border} ${colors.bg} p-6`}>
                      <h2 className={`text-xl font-heading font-bold ${colors.text} mb-4`}>
                        {categoryLabels[group.category] ?? group.category}
                      </h2>
                      <div className="space-y-3">
                        {group.projects.map((project) => (
                          <div
                            key={project.name}
                            className={`p-4 rounded-lg border transition-all ${
                              project.highlighted
                                ? "border-primary bg-white ring-2 ring-primary/20"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className={`font-medium ${project.highlighted ? "text-primary" : "text-dark"}`}>
                                  {project.name}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                              </div>
                              <span
                                className={`shrink-0 px-3 py-1 rounded-full text-sm font-bold ${
                                  project.highlighted ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {project.capacity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
