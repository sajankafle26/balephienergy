"use client";

import { useEffect, useState } from "react";
import { FaBolt } from "react-icons/fa";

interface Hero {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  backgroundImage: string;
}

export default function HeroSection() {
  const [hero, setHero] = useState<Hero>({
    badge: "40.00 MW Capacity",
    title: "Balephi Khola Hydroelectric Project",
    titleHighlight: "Hydroelectric",
    subtitle:
      "Developing affordable, renewable energy projects that enhance productivity and improve Nepalese living standards. Situated in Jugal Rural Municipality, Sindhupalchowk.",
    ctaPrimaryText: "Project Details",
    ctaPrimaryLink: "#project",
    ctaSecondaryText: "Company Profile",
    ctaSecondaryLink: "#about",
    backgroundImage: "/images/Picture1.png",
  });

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setHero(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={hero.backgroundImage}
          alt="Balephi Project Site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-primary/20 border border-primaryLight/30 backdrop-blur-sm text-primaryLight font-semibold px-4 py-1.5 rounded-full text-sm mb-6 uppercase tracking-wider flex items-center w-max">
            <FaBolt className="mr-2" /> {hero.badge}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] font-heading">
            {hero.title.split(hero.titleHighlight)[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryLight to-emerald-400">
              {hero.titleHighlight}
            </span>
            {hero.title.split(hero.titleHighlight)[1] || ""}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={hero.ctaPrimaryLink}
              className="bg-primary hover:bg-primaryLight text-white font-medium py-3.5 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(3,105,161,0.4)] hover:shadow-[0_0_25px_rgba(14,165,233,0.6)]"
            >
              {hero.ctaPrimaryText}
            </a>
            <a
              href={hero.ctaSecondaryLink}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium py-3.5 px-8 rounded-full transition-all"
            >
              {hero.ctaSecondaryText}{" "}
              <span className="text-sm ml-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
