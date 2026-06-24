import mongoose, { Schema, Document } from "mongoose";

export interface IStat extends Document {
  value: string;
  unit: string;
  label: string;
  order: number;
}

const StatSchema = new Schema<IStat>({
  value: { type: String, required: true },
  unit: { type: String, default: "" },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Stat || mongoose.model<IStat>("Stat", StatSchema);
