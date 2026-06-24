const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://sajankafle9841:zlxJdjZNiGxljg0e@cluster0.dwtxp87.mongodb.net/balephi";

// Schemas
const HeroSectionSchema = new mongoose.Schema({
  badge: String, title: String, titleHighlight: String, subtitle: String,
  ctaPrimaryText: String, ctaPrimaryLink: String, ctaSecondaryText: String,
  ctaSecondaryLink: String, backgroundImage: String,
}, { timestamps: true });

const StatSchema = new mongoose.Schema({
  value: String, unit: String, label: String, order: Number,
});

const AboutContentSchema = new mongoose.Schema({
  title: String, description: String, additionalText: String,
  milestones: [{ text: String, date: String }], images: [String],
}, { timestamps: true });

const TeamMemberSchema = new mongoose.Schema({
  name: String, role: String, category: String, bio: String, image: String, order: Number,
});

const ProjectDetailSchema = new mongoose.Schema({
  projectName: String, features: [{ key: String, value: String }], status: String,
  completedItems: [String], inProgressItems: [String], siteAccess: String, route: String, pdfUrl: String,
}, { timestamps: true });

const ChairmanMessageSchema = new mongoose.Schema({
  name: String, title: String, message: String, image: String,
}, { timestamps: true });

const RMGroupProjectSchema = new mongoose.Schema({
  category: String, name: String, capacity: String, description: String,
  highlighted: Boolean, order: Number,
});

const GalleryImageSchema = new mongoose.Schema({
  url: String, caption: String, order: Number,
});

const SiteSettingsSchema = new mongoose.Schema({
  phone: String, email: String, headOffice: String, siteOffice: String,
  website: String, facebook: String, copyright: String,
});

const NavigationMenuSchema = new mongoose.Schema({
  items: [{ label: String, href: String, children: [{ label: String, href: String }] }],
});

const RMGroupContentSchema = new mongoose.Schema({
  subtitle: String, title: String, description: String,
});

const ContactSubmissionSchema = new mongoose.Schema({
  name: String, email: String, phone: String, message: String,
  read: Boolean, createdAt: { type: Date, default: Date.now },
});

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas");

  const HeroSection = mongoose.models.HeroSection || mongoose.model("HeroSection", HeroSectionSchema);
  const Stat = mongoose.models.Stat || mongoose.model("Stat", StatSchema);
  const AboutContent = mongoose.models.AboutContent || mongoose.model("AboutContent", AboutContentSchema);
  const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
  const ProjectDetail = mongoose.models.ProjectDetail || mongoose.model("ProjectDetail", ProjectDetailSchema);
  const ChairmanMessage = mongoose.models.ChairmanMessage || mongoose.model("ChairmanMessage", ChairmanMessageSchema);
  const RMGroupProject = mongoose.models.RMGroupProject || mongoose.model("RMGroupProject", RMGroupProjectSchema);
  const GalleryImage = mongoose.models.GalleryImage || mongoose.model("GalleryImage", GalleryImageSchema);
  const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
  const NavigationMenu = mongoose.models.NavigationMenu || mongoose.model("NavigationMenu", NavigationMenuSchema);
  const RMGroupContent = mongoose.models.RMGroupContent || mongoose.model("RMGroupContent", RMGroupContentSchema);

  // Clear all
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
  console.log("Cleared all collections");

  // Hero Section
  await HeroSection.create({
    badge: "40.00 MW Capacity",
    title: "Balephi Khola Hydroelectric Project",
    titleHighlight: "Hydroelectric",
    subtitle: "Developing affordable, renewable energy projects that enhance productivity and improve Nepalese living standards. Situated in Jugal Rural Municipality, Sindhupalchowk.",
    ctaPrimaryText: "Project Details",
    ctaPrimaryLink: "#project",
    ctaSecondaryText: "Company Profile",
    ctaSecondaryLink: "#about",
    backgroundImage: "/images/Picture1.png",
  });
  console.log("Seeded Hero Section");

  // Stats
  await Stat.insertMany([
    { value: "40", unit: "MW", label: "Installed Capacity", order: 1 },
    { value: "227.6", unit: "GWh", label: "Total Yearly Energy", order: 2 },
    { value: "284.3", unit: "m", label: "Gross Head", order: 3 },
    { value: "2029", unit: "", label: "Expected RCOD", order: 4 },
  ]);
  console.log("Seeded Stats");

  // About Content
  await AboutContent.create({
    title: "About BEPL",
    description: "Balephi Energy Pvt. Ltd. (BEPL) is the developer of the Balephi Khola Hydroelectric Project. We are focused on developing and implementing affordable renewable energy projects that enhance productivity and improve Nepalese living standards.\n\nWe are driven to use state-of-the-art technology that maximizes the potential of hydro products in Nepal. BEPL is proudly affiliated with the RM Group, led by Mr. Krishna Prasad Acharya, a conglomerate involved in diverse business sectors across the country.",
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

  // Team Members
  await TeamMember.insertMany([
    {
      name: "Mr. Krishna Acharya", role: "RM Group Chairman / Chief of Management",
      category: "board", bio: "Prominent business leader since 1972 (RARA Instant Noodles), involved in hydropower, banking, insurance, tourism. Exec. Chair of Peoples Energy, Chair of Multi Energy.",
      image: "https://rmgroup.com.np/images/krishnasir.jpg", order: 1,
    },
    {
      name: "Mr. Dil Sundar Shrestha", role: "BEPL Chairperson / Project Director",
      category: "board", bio: "Established businessman (38 yrs). Exec. Committee Member FNCCI. Director at Peoples Energy, RM Power. Former Director Bindhyabasini Hydro.",
      image: "", order: 2,
    },
    {
      name: "Mr. Sudeep Acharya", role: "BEPL Director / Managing Director",
      category: "board", bio: "Active in promotion of Hydro-Electricity. Director at Bindhyabasini Hydro, Multi Energy, RM Power. Chairperson of RM Investment.",
      image: "", order: 3,
    },
    {
      name: "Mr. Ashish Shrestha", role: "BEPL Director",
      category: "board", bio: "Representing Seed Energy Ltd. Over 15 years experience in hotel, consulting, investment, and hydropower sectors.",
      image: "", order: 4,
    },
    {
      name: "Mr. Janardan Aryal", role: "General Manager / Company Secretary",
      category: "management", bio: "Bachelors in Business Studies. Serving since 2065 in various projects including Khimti II, Rudi Khola, Langtang Khola, and Gupche HEP.",
      image: "", order: 5,
    },
    {
      name: "Mr. Ram Hari Sharma", role: "Project Manager",
      category: "management", bio: "Master of Advance Studies (MAS) in Tunnel Engineering, M.Sc. Engineering Geology. Involved in numerous mega projects like Upper Karnali (900MW), Tamor-Mewa, Middle Marsyangdi.",
      image: "", order: 6,
    },
  ]);
  console.log("Seeded Team Members");

  // Project Detail
  await ProjectDetail.create({
    projectName: "Balephi Khola Hydroelectric Project (HEP)",
    features: [
      { key: "Type of Project", value: "Run of River (ROR)" },
      { key: "Design discharge", value: "17.1 m\u00B3/s" },
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
    route: "Kathmandu \u2192 Dhulikhel \u2192 Dolalghat \u2192 Khadichour \u2192 Balefi Bazar \u2192 Powerhouse",
    pdfUrl: "https://rmgroup.com.np/assets/images/Project%20Sailent%20feature.pdf",
  });
  console.log("Seeded Project Detail");

  // Chairman Message
  await ChairmanMessage.create({
    name: "Mr. Krishna Acharya",
    title: "RM Group Chairman / Chief of Management",
    message: "As the Chairman of the RM Group and Chief of Management for Balephi Energy, I am proud to oversee our journey toward making Nepal self-reliant in energy production. Our commitment extends beyond generating power; we aim to uplift communities, protect the environment, and foster economic growth across the nation through sustainable hydropower development.",
    image: "https://rmgroup.com.np/images/krishnasir.jpg",
  });
  console.log("Seeded Chairman Message");

  // RM Group Projects
  await RMGroupProject.insertMany([
    { category: "revenue", name: "Bindhyabasini Hydropower (Rudi A & B)", capacity: "15.4MW", description: "Operating", highlighted: false, order: 1 },
    { category: "revenue", name: "United Modi Hydropower (Lower Modi 1)", capacity: "10MW", description: "Operating", highlighted: false, order: 2 },
    { category: "construction", name: "Khimti 2 HEP", capacity: "48.8MW", description: "Under Construction", highlighted: false, order: 3 },
    { category: "construction", name: "Langtang Khola HEP", capacity: "30MW", description: "Under Construction", highlighted: false, order: 4 },
    { category: "construction", name: "Balephi Khola HEP", capacity: "40MW", description: "Under Construction", highlighted: true, order: 5 },
    { category: "study", name: "Gupche Khola HEP", capacity: "7.5MW", description: "Survey done, EIA ongoing", highlighted: false, order: 6 },
    { category: "study", name: "Ghunsa Khola HEP", capacity: "155MW", description: "Survey & EIA ongoing", highlighted: false, order: 7 },
    { category: "upcoming", name: "Bheri 8 HEP", capacity: "140MW", description: "Processing survey license", highlighted: false, order: 8 },
  ]);
  console.log("Seeded RM Group Projects");

  // Gallery Images
  await GalleryImage.insertMany([
    { url: "/images/Screenshot 2026-06-11 at 20.50.11.png", caption: "Project Site View 1", order: 1 },
    { url: "/images/Screenshot 2026-06-11 at 20.51.07.png", caption: "Project Site View 2", order: 2 },
    { url: "/images/Screenshot 2026-06-11 at 20.51.29.png", caption: "Project Site View 3", order: 3 },
    { url: "/images/Screenshot 2026-06-11 at 20.51.47.png", caption: "Project Site View 4", order: 4 },
  ]);
  console.log("Seeded Gallery Images");

  // Site Settings
  await SiteSettings.create({
    phone: "014791891",
    email: "Balephi.energy@rmgroup.com.np",
    headOffice: "Kathmandu-10, New Baneshwor, Kathmandu, Nepal",
    siteOffice: "Jugal Rural Municipality, Sindhupalchowk District, Nepal",
    website: "https://rmgroup.com.np/",
    facebook: "#",
    copyright: "\u00A9 2026 Balephi Energy Pvt. Ltd. All rights reserved.",
  });
  console.log("Seeded Site Settings");

  // Navigation Menu
  await NavigationMenu.create({
    items: [
      { label: "Home", href: "/" },
      {
        label: "About Us", href: "#",
        children: [
          { label: "Chairman Message", href: "/chairman" },
          { label: "Board of Directors", href: "/team" },
        ],
      },
      { label: "Gallery", href: "/gallery" },
      { label: "Project Update", href: "/project" },
      {
        label: "RM Group", href: "#",
        children: [
          { label: "RM Group Projects", href: "/rmgroup" },
        ],
      },
      { label: "Contact", href: "/contact" },
    ],
  });
  console.log("Seeded Navigation Menu");

  // RM Group Content
  await RMGroupContent.create({
    subtitle: "Affiliated With",
    title: "RM Group Energy Sector Involvement",
    description: "Balephi Energy is proud to be part of the RM Group, which boasts an extensive portfolio of hydropower projects across Nepal.",
  });
  console.log("Seeded RM Group Content");

  console.log("\n✅ All data seeded successfully to MongoDB Atlas!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
