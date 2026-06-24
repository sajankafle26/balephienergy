"use client";

import { useEffect, useState } from "react";
import { FaFlagCheckered } from "react-icons/fa";

interface About {
  title: string;
  description: string;
  additionalText: string;
  milestones: { text: string; date: string }[];
  images: string[];
}

const fallbackImages = [
  "/images/Screenshot 2026-06-11 at 20.50.11.png",
  "/images/Screenshot 2026-06-11 at 20.51.07.png",
  "/images/Screenshot 2026-06-11 at 20.51.29.png",
  "/images/Screenshot 2026-06-11 at 20.51.47.png",
];

export default function HomeAbout() {
  const [about, setAbout] = useState<About>({
    title: "",
    description: "",
    additionalText: "",
    milestones: [],
    images: [],
  });

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setAbout(data);
      })
      .catch(() => {});
  }, []);

  const images = about.images.length > 0 ? about.images : fallbackImages;
  const milestones =
    about.milestones.length > 0
      ? about.milestones
      : [
          { text: "Survey License", date: "2076/8/10" },
          { text: "EIA Approved", date: "2079.01.13" },
          { text: "PPA Signed with NEA", date: "2080/05/01" },
          { text: "Generation License", date: "2081/5/7" },
        ];

  return (
    <section id="about" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content side */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-px w-12 bg-primary"></span>
              <h3 className="text-primary font-bold uppercase tracking-widest text-sm">
                {about.title || "About BEPL"}
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight font-heading">
              Driving <span className="text-primary">Sustainable</span>{" "}
              Development in Nepal
            </h2>
            <div className="text-slate-600 space-y-5 leading-relaxed text-lg mb-8">
              {about.description ? (
                about.description.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <>
                  <p>
                    <strong>Balephi Energy Pvt. Ltd. (BEPL)</strong> is the developer
                    of the Balephi Khola Hydroelectric Project. We are focused on
                    developing and implementing affordable renewable energy projects
                    that enhance productivity and improve Nepalese living standards.
                  </p>
                  <p>
                    We are driven to use state-of-the-art technology that maximizes
                    the potential of hydro products in Nepal. BEPL is proudly
                    affiliated with the RM Group, led by Mr. Krishna Prasad Acharya,
                    a conglomerate involved in diverse business sectors across the
                    country.
                  </p>
                </>
              )}
            </div>

            <div className="bg-lightBg p-6 rounded-xl border border-slate-100 shadow-sm mb-8">
              <h4 className="font-bold text-slate-800 mb-3">
                <FaFlagCheckered className="text-secondary mr-2 inline" />{" "}
                Important Milestones
              </h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                {milestones.map((m, i) => (
                  <li key={i}>
                    <strong>{m.text}:</strong> {m.date}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={images[0] || fallbackImages[0]}
                  alt="Balephi Project Site 1"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={images[1] || fallbackImages[1]}
                  alt="Balephi Project Site 2"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={images[2] || fallbackImages[2]}
                  alt="Balephi Project Site 3"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
                <img
                  src={images[3] || fallbackImages[3]}
                  alt="Balephi Project Site 4"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
