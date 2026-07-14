import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HomeAbout from "@/components/HomeAbout";
import HomeProject from "@/components/HomeProject";
import SalientFeatures from "@/components/SalientFeatures";
import HomeRMGroup from "@/components/HomeRMGroup";
import HomeChairman from "@/components/HomeChairman";
import HomeTeam from "@/components/HomeTeam";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HomeAbout />
        <HomeProject />
        <SalientFeatures />
        <HomeRMGroup />
        <HomeChairman />
        <HomeTeam />
      </main>
      <Footer />
    </>
  );
}
