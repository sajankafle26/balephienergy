"use client";

import { useEffect, useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  category: string;
}

const placeholderImg = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const defaultBoard = [
  {
    name: "Mr. Krishna Acharya",
    role: "RM Group Chairman / Chief of Management",
    bio: "Prominent business leader since 1972 (RARA Instant Noodles), involved in hydropower, banking, insurance, tourism. Exec. Chair of Peoples Energy, Chair of Multi Energy.",
    image: "https://rmgroup.com.np/images/krishnasir.jpg",
    category: "board",
  },
  {
    name: "Mr. Dil Sundar Shrestha",
    role: "BEPL Chairperson / Project Director",
    bio: "Established businessman (38 yrs). Exec. Committee Member FNCCI. Director at Peoples Energy, RM Power. Former Director Bindhyabasini Hydro.",
    image: "",
    category: "board",
  },
  {
    name: "Mr. Sudeep Acharya",
    role: "BEPL Director / Managing Director",
    bio: "Active in promotion of Hydro-Electricity. Director at Bindhyabasini Hydro, Multi Energy, RM Power. Chairperson of RM Investment.",
    image: "",
    category: "board",
  },
  {
    name: "Mr. Ashish Shrestha",
    role: "BEPL Director",
    bio: "Representing Seed Energy Ltd. Over 15 years experience in hotel, consulting, investment, and hydropower sectors.",
    image: "",
    category: "board",
  },
];

const defaultManagement = [
  {
    name: "Mr. Janardan Aryal",
    role: "General Manager / Company Secretary",
    bio: "Bachelors in Business Studies. Serving since 2065 in various projects including Khimti II, Rudi Khola, Langtang Khola, and Gupche HEP.",
    image: "",
    category: "management",
  },
  {
    name: "Mr. Ram Hari Sharma",
    role: "Project Manager",
    bio: "Master of Advance Studies (MAS) in Tunnel Engineering, M.Sc. Engineering Geology. Involved in numerous mega projects like Upper Karnali (900MW), Tamor-Mewa, Middle Marsyangdi.",
    image: "",
    category: "management",
  },
];

export default function HomeTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setMembers(data);
      })
      .catch(() => {});
  }, []);

  const board = members.length > 0
    ? members.filter((m) => m.category === "board").slice(0, 4)
    : defaultBoard;
  const management = members.length > 0
    ? members.filter((m) => m.category === "management").slice(0, 2)
    : defaultManagement;

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="h-px w-8 bg-primary"></span>
            <h3 className="text-primary font-bold uppercase tracking-widest text-sm">
              Leadership
            </h3>
            <span className="h-px w-8 bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-heading">
            Board of Directors & Management
          </h2>
          <p className="text-slate-600 text-lg">
            Guided by experienced professionals in Nepal&apos;s business and
            hydropower sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {board.map((member, i) => (
            <div
              key={i}
              className="bg-lightBg rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 text-center p-6"
            >
              <img
                src={member.image || placeholderImg}
                alt={member.name}
                className={`w-24 h-24 mx-auto rounded-full object-cover object-top mb-4 shadow-md border-4 ${
                  member.image ? "border-primary" : "border-slate-200"
                }`}
              />
              <h4 className="text-lg font-bold text-slate-800 font-heading">
                {member.name}
              </h4>
              <p className="text-primary font-medium text-sm mb-4">
                {member.role}
              </p>
              <p className="text-xs text-slate-500 line-clamp-4">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center font-heading">
            Core Management Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {management.map((member, i) => (
              <div
                key={i}
                className={`border-l-4 pl-6 ${
                  i === 0 ? "border-primaryLight" : "border-secondary"
                }`}
              >
                <h4
                  className={`text-xl font-bold mb-1 font-heading ${
                    i === 0 ? "text-primaryLight" : "text-secondary"
                  }`}
                >
                  {member.name}
                </h4>
                <p className="text-white/80 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-slate-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
