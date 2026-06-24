"use client";

import { useEffect, useState } from "react";

interface Stat {
  value: string;
  unit: string;
  label: string;
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([
    { value: "40", unit: "MW", label: "Installed Capacity" },
    { value: "227.6", unit: "GWh", label: "Total Yearly Energy" },
    { value: "284.3", unit: "m", label: "Gross Head" },
    { value: "2029", unit: "", label: "Expected RCOD" },
  ]);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setStats(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative -mt-16 z-20 container mx-auto px-4 md:px-8">
      <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10 border border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          {stats.map((stat, i) => (
            <div key={i} className="p-2">
              <div className="text-4xl font-bold text-primary mb-2 font-heading">
                {stat.value}
                {stat.unit && (
                  <span className="text-2xl text-primaryLight">{stat.unit}</span>
                )}
              </div>
              <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
