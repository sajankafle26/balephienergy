"use client";

import { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaHardHat,
  FaChartLine,
  FaRocket,
  FaCheck,
  FaSpinner,
  FaBolt,
  FaFileAlt,
  FaArrowUp,
} from "react-icons/fa";

interface RMProject {
  category: string;
  name: string;
  capacity: string;
  description: string;
  highlighted: boolean;
}

interface RMGroupContent {
  subtitle: string;
  title: string;
  description: string;
}

export default function HomeRMGroup() {
  const [content, setContent] = useState<RMGroupContent>({
    subtitle: "Affiliated With",
    title: "RM Group Energy Sector Involvement",
    description: "Balephi Energy is proud to be part of the RM Group, which boasts an extensive portfolio of hydropower projects across Nepal.",
  });

  const [projects, setProjects] = useState<RMProject[]>([
    { category: "revenue", name: "Bindhyabasini Hydropower (Rudi A & B)", capacity: "15.4MW", description: "Revenue Generating", highlighted: false },
    { category: "revenue", name: "United Modi Hydropower (Lower Modi 1)", capacity: "10MW", description: "Revenue Generating", highlighted: false },
    { category: "construction", name: "Khimti 2 HEP", capacity: "48.8MW", description: "Under Construction", highlighted: false },
    { category: "construction", name: "Langtang Khola HEP", capacity: "30MW", description: "Under Construction", highlighted: false },
    { category: "construction", name: "Balephi Khola HEP", capacity: "40MW", description: "Under Construction", highlighted: true },
    { category: "study", name: "Gupche Khola HEP", capacity: "7.5MW", description: "Survey done, EIA ongoing", highlighted: false },
    { category: "study", name: "Ghunsa Khola HEP", capacity: "155MW", description: "Survey & EIA ongoing", highlighted: false },
    { category: "upcoming", name: "Bheri 8 HEP", capacity: "140MW", description: "Processing survey license", highlighted: false },
  ]);

  useEffect(() => {
    fetch("/api/rmgroup-content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setContent(data);
      })
      .catch(() => {});

    fetch("/api/rmgroup")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const revenue = projects.filter((p) => p.category === "revenue");
  const construction = projects.filter((p) => p.category === "construction");
  const study = projects.filter((p) => p.category === "study");
  const upcoming = projects.filter((p) => p.category === "upcoming");

  return (
    <section id="rmgroup" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="h-px w-8 bg-primary"></span>
            <h3 className="text-primary font-bold uppercase tracking-widest text-sm">
              {content.subtitle}
            </h3>
            <span className="h-px w-8 bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-heading">
            {content.title}
          </h2>
          <p className="text-slate-600 text-lg">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue Generated */}
          <div className="bg-white p-6 rounded-xl shadow-soft border border-emerald-100 border-t-4 border-t-emerald-500">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xl mb-4">
              <FaMoneyBillWave />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-4 font-heading">
              Revenue Generating
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {revenue.map((p) => (
                <li key={p.name} className="flex items-start">
                  <FaCheck className="text-emerald-500 mt-1 mr-2 shrink-0" />
                  {p.name} - {p.capacity}
                </li>
              ))}
            </ul>
          </div>

          {/* Under Construction */}
          <div className="bg-white p-6 rounded-xl shadow-soft border border-amber-100 border-t-4 border-t-amber-500">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-xl mb-4">
              <FaHardHat />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-4 font-heading">
              Under Construction
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {construction.map((p) => (
                <li
                  key={p.name}
                  className={`flex items-start ${
                    p.highlighted ? "font-semibold text-primary" : ""
                  }`}
                >
                  {p.highlighted ? (
                    <FaBolt className="text-primary mt-1 mr-2 shrink-0" />
                  ) : (
                    <FaSpinner className="text-amber-500 mt-1 mr-2 shrink-0" />
                  )}
                  {p.name} - {p.capacity}
                </li>
              ))}
            </ul>
          </div>

          {/* Under Study */}
          <div className="bg-white p-6 rounded-xl shadow-soft border border-blue-100 border-t-4 border-t-blue-500">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-4">
              <FaChartLine />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-4 font-heading">
              Under Study
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {study.map((p) => (
                <li key={p.name} className="flex items-start">
                  <FaFileAlt className="text-blue-500 mt-1 mr-2 shrink-0" />
                  {p.name} - {p.capacity} ({p.description})
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming */}
          <div className="bg-white p-6 rounded-xl shadow-soft border border-purple-100 border-t-4 border-t-purple-500">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xl mb-4">
              <FaRocket />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-4 font-heading">
              Upcoming Projects
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {upcoming.map((p) => (
                <li key={p.name} className="flex items-start">
                  <FaArrowUp className="text-purple-500 mt-1 mr-2 shrink-0" />
                  {p.name} - {p.capacity} ({p.description})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
