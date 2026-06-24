import mongoose, { Schema, Document } from "mongoose";

export interface IAboutContent extends Document {
  title: string;
  description: string;
  additionalText: string;
  milestones: { text: string; date: string }[];
  images: string[];
}

const AboutContentSchema = new Schema<IAboutContent>({
  title: { type: String, default: "About Balephi Energy" },
  description: { type: String, default: "Balephi Energy Pvt. Ltd. (BEPL) is the developer of the Balephi Khola Hydroelectric Project. Focused on developing and implementing affordable renewable energy projects that enhance productivity and improve Nepalese living standards. Driven to use state-of-the-art technology that maximizes the potential of hydro products in Nepal. Proudly affiliated with the RM Group, led by Mr. Krishna Prasad Acharya, a conglomerate involved in diverse business sectors across the country." },
  additionalText: { type: String, default: "" },
  milestones: [{ text: String, date: String }],
  images: [String],
});

export default mongoose.models.AboutContent || mongoose.model<IAboutContent>("AboutContent", AboutContentSchema);
