"use client";

import { useEffect, useState } from "react";

interface Chairman {
  name: string;
  title: string;
  message: string;
  image: string;
}

export default function HomeChairman() {
  const [chairman, setChairman] = useState<Chairman>({
    name: "Mr. Krishna Acharya",
    title: "RM Group Chairman / Chief of Management",
    message:
      "As the Chairman of the RM Group and Chief of Management for Balephi Energy, I am proud to oversee our journey toward making Nepal self-reliant in energy production. Our commitment extends beyond generating power; we aim to uplift communities, protect the environment, and foster economic growth across the nation through sustainable hydropower development.",
    image: "https://rmgroup.com.np/images/krishnasir.jpg",
  });

  useEffect(() => {
    fetch("/api/chairman")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setChairman(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-white">
              <img
                src={chairman.image}
                alt={chairman.name}
                className="w-full h-auto object-cover object-top"
                style={{ maxHeight: "450px" }}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-px w-12 bg-secondary"></span>
              <h3 className="text-secondary font-bold uppercase tracking-widest text-sm">
                Message from the Chairman
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight font-heading">
              Committed to Energizing Nepal&apos;s Future
            </h2>
            <div className="text-slate-600 space-y-5 leading-relaxed text-lg mb-8 italic border-l-4 border-primary pl-6 bg-white py-6 pr-6 rounded-r-xl shadow-sm">
              <p>&ldquo;{chairman.message}&rdquo;</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-slate-800 font-heading">
                {chairman.name}
              </h4>
              <p className="text-primary font-medium mt-1">{chairman.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
