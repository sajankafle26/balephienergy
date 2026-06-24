"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaTimes } from "react-icons/fa";

interface GalleryImage {
  url: string;
  caption: string;
  order: number;
}

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGalleryImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
            Project <span className="text-primary">Gallery</span>
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover"
                  onClick={() => setLightbox(i)}
                >
                  <div className="aspect-video bg-gray-200">
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <FaTimes size={24} />
          </button>
          <img
            src={galleryImages[lightbox].url}
            alt={galleryImages[lightbox].caption}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white text-sm">{galleryImages[lightbox].caption}</p>
        </div>
      )}

      <Footer />
    </>
  );
}
