"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  category: "board" | "management";
  bio: string;
  image: string;
  order: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const boardMembers = members
    .filter((m) => m.category === "board")
    .sort((a, b) => a.order - b.order);

  const managementMembers = members
    .filter((m) => m.category === "management")
    .sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 text-lg">Loading team members...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
            Board of <span className="text-primary">Directors</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {boardMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
                <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{getInitials(member.name)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-dark">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark text-center mb-8">
            Core <span className="text-primary">Management</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {managementMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
                <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-secondary">{getInitials(member.name)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-dark">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
