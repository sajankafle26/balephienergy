import mongoose, { Schema, Document } from "mongoose";

export interface IProjectDetail extends Document {
  projectName: string;
  features: { key: string; value: string }[];
  status: string;
  completedItems: string[];
  inProgressItems: string[];
  siteAccess: string;
  route: string;
  pdfUrl: string;
}

const ProjectDetailSchema = new Schema<IProjectDetail>({
  projectName: { type: String, default: "Balephi Khola Hydroelectric Project (HEP)" },
  features: [{ key: String, value: String }],
  status: { type: String, default: "Under Construction" },
  completedItems: [String],
  inProgressItems: [String],
  siteAccess: { type: String, default: "Approximately 110 km from Kathmandu" },
  route: { type: String, default: "Kathmandu > Dhulikhel > Dolalghat > Khadichour > Balefi Bazar > Powerhouse" },
  pdfUrl: { type: String, default: "https://rmgroup.com.np/assets/images/Project%20Sailent%20feature.pdf" },
});

export default mongoose.models.ProjectDetail || mongoose.model<IProjectDetail>("ProjectDetail", ProjectDetailSchema);
