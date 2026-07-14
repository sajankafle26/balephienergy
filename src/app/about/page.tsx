"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AboutData {
  title: string;
  description: string;
  additionalText: string;
  milestones: { text: string; date: string }[];
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
          ) : data ? (
            <>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
                {data.title}
              </h1>
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {data.description}
                </p>
                {data.additionalText && (
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {data.additionalText}
                  </p>
                )}
                {data.milestones && data.milestones.length > 0 && (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-dark mb-4">
                      Milestones
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.milestones.map((m, i) => (
                        <div
                          key={i}
                          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                        >
                          <h3 className="font-medium text-dark">{m.text}</h3>
                          <p className="text-sm text-primary mt-1">{m.date}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-20">
              Failed to load about content.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
