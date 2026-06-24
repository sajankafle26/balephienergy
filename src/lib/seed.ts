import mongoose from "mongoose";
import HeroSection from "./models/HeroSection";
import Stat from "./models/Stat";
import AboutContent from "./models/AboutContent";
import TeamMember from "./models/TeamMember";
import ProjectDetail from "./models/ProjectDetail";
import ChairmanMessage from "./models/ChairmanMessage";
import RMGroupProject from "./models/RMGroupProject";
import GalleryImage from "./models/GalleryImage";
import SiteSettings from "./models/SiteSettings";
import NavigationMenu from "./models/NavigationMenu";
import RMGroupContent from "./models/RMGroupContent";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/balephi";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear all collections
  await HeroSection.deleteMany({});
  await Stat.deleteMany({});
  await AboutContent.deleteMany({});
  await TeamMember.deleteMany({});
  await ProjectDetail.deleteMany({});
  await ChairmanMessage.deleteMany({});
  await RMGroupProject.deleteMany({});
  await GalleryImage.deleteMany({});
  await SiteSettings.deleteMany({});
  await NavigationMenu.deleteMany({});
  await RMGroupContent.deleteMany({});

  // Seed Hero Section
  await HeroSection.create({
    badge: "40.00 MW Capacity",
    title: "Balephi Khola Hydroelectric Project",
    titleHighlight: "Hydroelectric",
    subtitle: "Developing affordable, renewable energy projects that enhance productivity and improve Nepalese living standards. Situated in Jugal Rural Municipality, Sindhupalchowk.",
    ctaPrimaryText: "Project Details",
    ctaPrimaryLink: "/project",
    ctaSecondaryText: "Company Profile",
    ctaSecondaryLink: "/about",
    backgroundImage: "/images/Picture1.png",
  });
  console.log("Seeded Hero Section");

  // Seed Stats
  await Stat.insertMany([
    { value: "40", unit: "MW", label: "Installed Capacity", order: 1 },
    { value: "227.6", unit: "GWh", label: "Total Yearly Energy", order: 2 },
    { value: "284.3", unit: "m", label: "Gross Head", order: 3 },
    { value: "2029", unit: "", label: "Expected RCOD", order: 4 },
  ]);
  console.log("Seeded Stats");

  // Seed About Content
  await AboutContent.create({
    title: "About Balephi Energy",
    description: "Balephi Energy Pvt. Ltd. (BEPL) is the developer of the Balephi Khola Hydroelectric Project. Focused on developing and implementing affordable renewable energy projects that enhance productivity and improve Nepalese living standards. Driven to use state-of-the-art technology that maximizes the potential of hydro products in Nepal. Proudly affiliated with the RM Group, led by Mr. Krishna Prasad Acharya, a conglomerate involved in diverse business sectors across the country.",
    additionalText: "",
    milestones: [
      { text: "Survey License", date: "2076/8/10" },
      { text: "EIA Approved", date: "2079.01.13" },
      { text: "PPA Signed with NEA", date: "2080/05/01" },
      { text: "Generation License", date: "2081/5/7" },
    ],
    images: [
      "/images/Screenshot 2026-06-11 at 20.50.11.png",
      "/images/Screenshot 2026-06-11 at 20.51.07.png",
      "/images/Screenshot 2026-06-11 at 20.51.29.png",
      "/images/Screenshot 2026-06-11 at 20.51.47.png",
    ],
  });
  console.log("Seeded About Content");

  // Seed Team Members
  await TeamMember.insertMany([
    {
      name: "Mr. Krishna Acharya",
      role: "RM Group Chairman / Chief of Management",
      category: "board",
      bio: "Prominent business leader since 1972 (RARA Instant Noodles), involved in hydropower, banking, insurance, tourism. Exec. Chair of Peoples Energy, Chair of Multi Energy.",
      image: "https://rmgroup.com.np/images/krishnasir.jpg",
      order: 1,
    },
    {
      name: "Mr. Dil Sundar Shrestha",
      role: "BEPL Chairperson / Project Director",
      category: "board",
      bio: "Established businessman (38 yrs). Exec. Committee Member FNCCI. Director at Peoples Energy, RM Power. Former Director Bindhyabasini Hydro.",
      image: "",
      order: 2,
    },
    {
      name: "Mr. Sudeep Acharya",
      role: "BEPL Director / Managing Director",
      category: "board",
      bio: "Active in promotion of Hydro-Electricity. Director at Bindhyabasini Hydro, Multi Energy, RM Power. Chairperson of RM Investment.",
      image: "",
      order: 3,
    },
    {
      name: "Mr. Ashish Shrestha",
      role: "BEPL Director",
      category: "board",
      bio: "Representing Seed Energy Ltd. Over 15 years experience in hotel, consulting, investment, and hydropower sectors.",
      image: "",
      order: 4,
    },
    {
      name: "Mr. Janardan Aryal",
      role: "General Manager / Company Secretary",
      category: "management",
      bio: "Bachelors in Business Studies. Serving since 2065 in various projects including Khimti II, Rudi Khola, Langtang Khola, and Gupche HEP.",
      image: "",
      order: 5,
    },
    {
      name: "Mr. Ram Hari Sharma",
      role: "Project Manager",
      category: "management",
      bio: "Master of Advance Studies (MAS) in Tunnel Engineering, M.Sc. Engineering Geology. Involved in numerous mega projects like Upper Karnali (900MW), Tamor-Mewa, Middle Marsyangdi.",
      image: "",
      order: 6,
    },
  ]);
  console.log("Seeded Team Members");

  // Seed Project Detail
  await ProjectDetail.create({
    projectName: "Balephi Khola Hydroelectric Project (HEP)",
    features: [
      { key: "Type", value: "Run of River (ROR)" },
      { key: "Design Discharge", value: "17.1 m³/s" },
      { key: "Gross Head", value: "284.3 m" },
      { key: "Installed Capacity", value: "40.03 MW" },
      { key: "Dry Period Energy", value: "35.04 GWh (15.39%)" },
      { key: "Wet Period Energy", value: "192.61 GWh (84.61%)" },
      { key: "Total Yearly Energy", value: "227.6 GWh" },
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
    route: "Kathmandu > Dhulikhel > Dolalghat > Khadichour > Balefi Bazar > Powerhouse",
    pdfUrl: "https://rmgroup.com.np/assets/images/Project%20Sailent%20feature.pdf",
  });
  console.log("Seeded Project Detail");

  // Seed Chairman Message
  await ChairmanMessage.create({
    name: "Mr. Krishna Acharya",
    title: "RM Group Chairman / Chief of Management",
    message: "As the Chairman of the RM Group and Chief of Management for Balephi Energy, I am proud to oversee our journey toward making Nepal self-reliant in energy production. Our commitment extends beyond generating power; we aim to uplift communities, protect the environment, and foster economic growth across the nation through sustainable hydropower development.",
    image: "https://rmgroup.com.np/images/krishnasir.jpg",
  });
  console.log("Seeded Chairman Message");

  // Seed RM Group Projects
  await RMGroupProject.insertMany([
    { category: "revenue", name: "Bindhyabasini Hydropower (Rudi A & B)", capacity: "15.4 MW", description: "Operating", highlighted: false, order: 1 },
    { category: "revenue", name: "United Modi Hydropower (Lower Modi 1)", capacity: "10 MW", description: "Operating", highlighted: false, order: 2 },
    { category: "construction", name: "Khimti 2 HEP", capacity: "48.8 MW", description: "Under Construction", highlighted: false, order: 3 },
    { category: "construction", name: "Langtang Khola HEP", capacity: "30 MW", description: "Under Construction", highlighted: false, order: 4 },
    { category: "construction", name: "Balephi Khola HEP", capacity: "40 MW", description: "Under Construction", highlighted: true, order: 5 },
    { category: "study", name: "Gupche Khola HEP", capacity: "7.5 MW", description: "Survey done, EIA ongoing", highlighted: false, order: 6 },
    { category: "study", name: "Ghunsa Khola HEP", capacity: "155 MW", description: "Survey & EIA ongoing", highlighted: false, order: 7 },
    { category: "upcoming", name: "Bheri 8 HEP", capacity: "140 MW", description: "Processing survey license", highlighted: false, order: 8 },
  ]);
  console.log("Seeded RM Group Projects");

  // Seed Gallery Images
  await GalleryImage.insertMany([
    { url: "/images/Screenshot 2026-06-11 at 20.50.11.png", caption: "Project Site View 1", order: 1 },
    { url: "/images/Screenshot 2026-06-11 at 20.51.07.png", caption: "Project Site View 2", order: 2 },
    { url: "/images/Screenshot 2026-06-11 at 20.51.29.png", caption: "Project Site View 3", order: 3 },
    { url: "/images/Screenshot 2026-06-11 at 20.51.47.png", caption: "Project Site View 4", order: 4 },
  ]);
  console.log("Seeded Gallery Images");

  // Seed Site Settings
  await SiteSettings.create({
    phone: "014791891",
    email: "Balephi.energy@rmgroup.com.np",
    headOffice: "Kathmandu-10, New Baneshwor, Kathmandu, Nepal",
    siteOffice: "Jugal Rural Municipality, Sindhupalchowk District, Nepal",
    website: "https://rmgroup.com.np/",
    facebook: "#",
    copyright: "© 2026 Balephi Energy Pvt. Ltd. All rights reserved.",
  });
  console.log("Seeded Site Settings");

  // Seed Navigation Menu
  await NavigationMenu.deleteMany({});
  await NavigationMenu.create({
    items: [
      { label: "Home", href: "/" },
      {
        label: "About Us",
        href: "#",
        children: [
          { label: "Chairman Message", href: "/chairman" },
          { label: "Board of Directors", href: "/team" },
        ],
      },
      { label: "Gallery", href: "/gallery" },
      { label: "Project Update", href: "/project" },
      {
        label: "RM Group",
        href: "#",
        children: [
          { label: "RM Group Projects", href: "/rmgroup" },
        ],
      },
      { label: "Contact", href: "/contact" },
    ],
  });
  console.log("Seeded Navigation Menu");

  // Seed RM Group Content
  await RMGroupContent.create({
    subtitle: "Affiliated With",
    title: "RM Group Energy Sector Involvement",
    description: "Balephi Energy is proud to be part of the RM Group, which boasts an extensive portfolio of hydropower projects across Nepal.",
  });
  console.log("Seeded RM Group Content");

  console.log("\nDatabase seeded successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
