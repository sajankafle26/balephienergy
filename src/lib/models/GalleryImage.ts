import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
  url: string;
  caption: string;
  order: number;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  url: { type: String, required: true },
  caption: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
