const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://sajankafle9841:zlxJdjZNiGxljg0e@cluster0.dwtxp87.mongodb.net/balephi";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas");

  const AboutContent = mongoose.models.AboutContent || mongoose.model("AboutContent", new mongoose.Schema({
    title: String, description: String, additionalText: String,
    milestones: [{ text: String, date: String }], images: [String],
  }, { strict: false, timestamps: true }));

  await AboutContent.deleteMany({});
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

  console.log("About content seeded with images!");
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
