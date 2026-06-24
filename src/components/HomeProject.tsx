"use client";

import { useEffect, useState } from "react";
import { FaCogs, FaTasks, FaMapMarkerAlt } from "react-icons/fa";

interface Feature {
  key: string;
  value: string;
}

interface Project {
  projectName: string;
  features: Feature[];
  status: string;
  completedItems: string[];
  inProgressItems: string[];
  siteAccess: string;
  route: string;
}

export default function HomeProject() {
  const [project, setProject] = useState<Project>({
    projectName: "Balephi Khola HEP",
    features: [
      { key: "Type of Project", value: "Run of River (ROR)" },
      { key: "Design discharge", value: "17.1 m³/s" },
      { key: "Gross head", value: "284.3 m" },
      { key: "Installed capacity", value: "40.03 MW" },
      { key: "Dry period energy", value: "35.04 GWh (15.39%)" },
      { key: "Wet period energy", value: "192.61 GWh (84.61%)" },
    ],
    status: "Under Construction",
    completedItems: [
      "Feasibility study completed",
      "Grid connection agreement signed",
      "PPA signed with NEA",
      "Generation License obtained",
      "Updated EIA report approved",
    ],
    inProgressItems: [
      "Private land purchase in progress",
      "Civil work contracts being finalized",
      "Topographical survey contracts signed",
      "Design consultant signed",
      "Explosives contract signed",
    ],
    siteAccess: "Approximately 110 km from Kathmandu to Powerhouse",
    route: "Kathmandu → Dhulikhel → Dolalghat → Khadichour → Balefi Bazar → Powerhouse",
  });

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setProject(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="project" className="py-20 bg-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="h-px w-8 bg-primaryLight"></span>
            <h3 className="text-primaryLight font-bold uppercase tracking-widest text-sm">
              Our Flagship Project
            </h3>
            <span className="h-px w-8 bg-primaryLight"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
            {project.projectName || "Balephi Khola HEP"}
          </h2>
          <p className="text-slate-400 text-lg">
            A 40.00 MW Run-of-River (ROR) project located in Jugal Rural
            Municipality, Sindhupalchowk District.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Features */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-primaryLight font-heading">
              <FaCogs className="mr-2 inline" /> Technical Features
            </h3>
            <ul className="divide-y divide-slate-700">
              {project.features.map((f, i) => (
                <li key={i} className="py-4 flex justify-between">
                  <span className="text-slate-400">{f.key}</span>
                  <span className="font-semibold text-white">{f.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Status & Access */}
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-primaryLight font-heading">
                <FaTasks className="mr-2 inline" /> Project Status
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Currently <strong>{project.status}</strong>.
              </p>
              {project.completedItems.length > 0 && (
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {project.completedItems.join(", ")} are all{" "}
                  <strong className="text-emerald-400">completed</strong>.
                </p>
              )}
              {project.inProgressItems.length > 0 && (
                <p className="text-slate-300 leading-relaxed">
                  {project.inProgressItems.join(", ")} are{" "}
                  <strong className="text-amber-400">in progress</strong>.
                </p>
              )}
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-primaryLight font-heading">
                <FaMapMarkerAlt className="mr-2 inline" /> Site Access
              </h3>
              <p className="text-slate-300 leading-relaxed">
                <strong>{project.siteAccess}:</strong>
                <br />
                {project.route}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
