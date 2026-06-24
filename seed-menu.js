const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://sajankafle9841:zlxJdjZNiGxljg0e@cluster0.dwtxp87.mongodb.net/balephi";

const NavigationMenuSchema = new mongoose.Schema({
  items: [{ label: String, href: String, children: [{ label: String, href: String }] }],
});

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas");

  const NavigationMenu = mongoose.models.NavigationMenu || mongoose.model("NavigationMenu", NavigationMenuSchema);

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
          { label: "Brochure", href: "/project" },
          { label: "News & Notices", href: "/project" },
          { label: "Q. Reports", href: "/project" },
          { label: "AGM", href: "/project" },
          { label: "Share Form", href: "/project" },
          { label: "Company Policies", href: "/project" },
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

  console.log("Navigation menu seeded with sub-menus!");
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
