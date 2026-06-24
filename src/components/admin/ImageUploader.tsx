"use client";

import { useState, useRef } from "react";
import { FaUpload, FaTimes, FaImage } from "react-icons/fa";

interface ImageUploaderProps {
  currentImage: string;
  onUpload: (url: string) => void;
}

export default function ImageUploader({ currentImage, onUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onUpload(data.url);
      }
    } catch (error) {
      console.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
          <button
            type="button"
            onClick={() => { setPreview(""); onUpload(""); }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <FaTimes size={10} />
          </button>
        </div>
      )}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>Uploading...</>
          ) : (
            <>
              <FaUpload className="text-xs" />
              {preview ? "Change Image" : "Upload Image"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
