import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  phone: string;
  email: string;
  headOffice: string;
  siteOffice: string;
  website: string;
  facebook: string;
  copyright: string;
  logo: string;
  favicon: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  phone: { type: String, default: "014791891" },
  email: { type: String, default: "Balephi.energy@rmgroup.com.np" },
  headOffice: { type: String, default: "Kathmandu-10, New Baneshwor, Kathmandu, Nepal" },
  siteOffice: { type: String, default: "Jugal Rural Municipality, Sindhupalchowk District, Nepal" },
  website: { type: String, default: "https://rmgroup.com.np/" },
  facebook: { type: String, default: "#" },
  copyright: { type: String, default: "© 2026 Balephi Energy Pvt. Ltd. All rights reserved." },
  logo: { type: String, default: "/images/logo.jpeg" },
  favicon: { type: String, default: "/images/logo.jpeg" },
});

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
