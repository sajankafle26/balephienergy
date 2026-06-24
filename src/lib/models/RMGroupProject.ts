import mongoose, { Schema, Document } from "mongoose";

export interface IRMGroupProject extends Document {
  category: "revenue" | "construction" | "study" | "upcoming";
  name: string;
  capacity: string;
  description: string;
  highlighted: boolean;
  order: number;
}

const RMGroupProjectSchema = new Schema<IRMGroupProject>({
  category: { type: String, enum: ["revenue", "construction", "study", "upcoming"], required: true },
  name: { type: String, required: true },
  capacity: { type: String, default: "" },
  description: { type: String, default: "" },
  highlighted: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

export default mongoose.models.RMGroupProject || mongoose.model<IRMGroupProject>("RMGroupProject", RMGroupProjectSchema);
