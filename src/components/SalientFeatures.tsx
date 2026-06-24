"use client";

import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";

export default function SalientFeatures() {
  const [pdfUrl, setPdfUrl] = useState(
    "https://rmgroup.com.np/assets/images/Project%20Sailent%20feature.pdf"
  );

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.pdfUrl) setPdfUrl(data.pdfUrl);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="h-px w-8 bg-secondary"></span>
            <h3 className="text-secondary font-bold uppercase tracking-widest text-sm">
              Project Specifications
            </h3>
            <span className="h-px w-8 bg-secondary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-heading">
            Salient Features
          </h2>
          <p className="text-slate-600 text-lg">
            Detailed technical specifications and features of the Balephi Khola
            Hydroelectric Project.
          </p>
        </div>
        <div className="w-full max-w-5xl mx-auto bg-slate-100 rounded-2xl shadow-inner p-2 md:p-4 border border-slate-200">
          <object
            data={pdfUrl}
            type="application/pdf"
            width="100%"
            height="800px"
            className="rounded-xl border border-slate-300 shadow-sm bg-white"
          >
            <embed src={pdfUrl} type="application/pdf" />
          </object>

          <div className="text-center mt-6">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-primary text-white font-semibold hover:bg-primaryLight py-2.5 px-6 rounded-full transition-colors shadow-md"
            >
              <FaFilePdf className="mr-2" /> View Full Salient Features PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
