"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ChairmanData {
  name: string;
  title: string;
  message: string;
  image: string;
}

export default function ChairmanPage() {
  const [chairman, setChairman] = useState<ChairmanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chairman")
      .then((res) => res.json())
      .then((data) => {
        setChairman(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
            Message from <span className="text-primary">Chairman</span>
          </h1>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : chairman ? (
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-primary/20">
                <img
                  src={chairman.image}
                  alt={chairman.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <blockquote className="text-gray-600 leading-relaxed text-lg italic mb-6">
                  &ldquo;{chairman.message}&rdquo;
                </blockquote>
                <div>
                  <h3 className="font-heading font-bold text-dark text-lg">{chairman.name}</h3>
                  <p className="text-primary text-sm">{chairman.title}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Chairman data not available.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
