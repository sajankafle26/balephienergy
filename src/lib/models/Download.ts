import mongoose, { Schema, Document } from "mongoose";

export interface IDownload extends Document {
  title: string;
  category: "brochure" | "news" | "reports" | "agm" | "share-form" | "policies";
  fileUrl: string;
  description: string;
  order: number;
}

const DownloadSchema = new Schema<IDownload>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["brochure", "news", "reports", "agm", "share-form", "policies"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Download ||
  mongoose.model<IDownload>("Download", DownloadSchema);
