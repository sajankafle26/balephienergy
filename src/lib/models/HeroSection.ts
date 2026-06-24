import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSection extends Document {
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

const HeroSectionSchema = new Schema<IHeroSection>({
  badge: { type: String, default: "40.00 MW Capacity" },
  title: { type: String, default: "Balephi Khola Hydroelectric Project" },
  titleHighlight: { type: String, default: "Hydroelectric" },
  subtitle: { type: String, default: "Developing affordable, renewable energy projects that enhance productivity and improve Nepalese living standards. Situated in Jugal Rural Municipality, Sindhupalchowk." },
  ctaPrimaryText: { type: String, default: "Project Details" },
  ctaPrimaryLink: { type: String, default: "/project" },
  ctaSecondaryText: { type: String, default: "Company Profile" },
  ctaSecondaryLink: { type: String, default: "/about" },
  backgroundImage: { type: String, default: "/images/Picture1.png" },
});

export default mongoose.models.HeroSection || mongoose.model<IHeroSection>("HeroSection", HeroSectionSchema);
