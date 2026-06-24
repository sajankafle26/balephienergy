const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://sajankafle9841:zlxJdjZNiGxljg0e@cluster0.dwtxp87.mongodb.net/balephi";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas");

  const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", new mongoose.Schema({
    phone: String, email: String, headOffice: String, siteOffice: String,
    website: String, facebook: String, copyright: String, logo: String, favicon: String,
  }, { strict: false }));

  const result = await SiteSettings.updateMany(
    {},
    { $set: { logo: "/images/logo.jpeg", favicon: "/images/logo.jpeg" } }
  );
  console.log(`Updated ${result.modifiedCount} site settings with logo/favicon`);

  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
