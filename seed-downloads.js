const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://sajankafle9841:zlxJdjZNiGxljg0e@cluster0.dwtxp87.mongodb.net/balephi";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas");

  const Download = mongoose.models.Download || mongoose.model("Download", new mongoose.Schema({
    title: String, category: String, fileUrl: String, description: String, order: Number,
  }, { strict: false, timestamps: true }));

  const NavigationMenu = mongoose.models.NavigationMenu || mongoose.model("NavigationMenu", new mongoose.Schema({
    items: [{ label: String, href: String, children: [{ label: String, href: String }] }],
  }, { strict: false }));

  // Seed downloads
  await Download.deleteMany({});
  await Download.insertMany([
    { title: "Balephi Khola HEP Project Brochure", category: "brochure", fileUrl: "https://rmgroup.com.np/assets/images/Project%20Sailent%20feature.pdf", description: "Complete project overview and specifications", order: 0 },
    { title: "Project Salient Features PDF", category: "brochure", fileUrl: "https://rmgroup.com.np/assets/images/Project%20Sailent%20feature.pdf", description: "Technical features and data summary", order: 1 },
    { title: "Q1 Report 2082", category: "reports", fileUrl: "#", description: "First quarterly progress report", order: 0 },
    { title: "Q2 Report 2082", category: "reports", fileUrl: "#", description: "Second quarterly progress report", order: 1 },
    { title: "Notice: EIA Approval", category: "news", fileUrl: "#", description: "Official notice of EIA approval from MoE", order: 0 },
    { title: "Notice: PPA Signing", category: "news", fileUrl: "#", description: "Press release regarding PPA signing with NEA", order: 1 },
    { title: "18th AGM Notice", category: "agm", fileUrl: "#", description: "Annual General Meeting notice and agenda", order: 0 },
    { title: "Share Transfer Form", category: "share-form", fileUrl: "#", description: "Official form for share transfer requests", order: 0 },
    { title: "Company Governance Policy", category: "policies", fileUrl: "#", description: "Corporate governance guidelines", order: 0 },
    { title: "Environmental Policy", category: "policies", fileUrl: "#", description: "Environmental sustainability commitment", order: 1 },
  ]);
  console.log("Downloads seeded!");

  // Update navigation menu with proper download links
  await NavigationMenu.deleteMany({});
  await NavigationMenu.create({
    items: [
      { label: "Home", href: "/" },
      {
        label: "About Us", href: "#",
        children: [
          { label: "Background of the Company", href: "/about" },
          { label: "Message from Chairman", href: "/chairman" },
          { label: "Board of Directors", href: "/team" },
          { label: "Management / Technical Team", href: "/team" },
          { label: "Committee & Sub Committee", href: "/about" },
          { label: "CSR", href: "/about" },
        ],
      },
      {
        label: "Downloads", href: "#",
        children: [
          { label: "Brochure", href: "/downloads?category=brochure" },
          { label: "News & Notices", href: "/downloads?category=news" },
          { label: "Q. Reports", href: "/downloads?category=reports" },
          { label: "AGM", href: "/downloads?category=agm" },
          { label: "Share Form", href: "/downloads?category=share-form" },
          { label: "Company Policies", href: "/downloads?category=policies" },
        ],
      },
      { label: "Gallery", href: "/gallery" },
      { label: "Project Update", href: "/project" },
      {
        label: "RM Group", href: "#",
        children: [
          { label: "RM Group Projects", href: "/rmgroup" },
          { label: "Partners", href: "/rmgroup" },
          { label: "Subsidiaries", href: "/rmgroup" },
        ],
      },
      { label: "Contact", href: "/contact" },
    ],
  });
  console.log("Navigation menu updated with download links!");

  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
