import mongoose, { Schema, Document } from "mongoose";

export interface IRMGroupContent extends Document {
  subtitle: string;
  title: string;
  description: string;
}

const RMGroupContentSchema = new Schema<IRMGroupContent>({
  subtitle: { type: String, default: "Affiliated With" },
  title: { type: String, default: "RM Group Energy Sector Involvement" },
  description: { type: String, default: "Balephi Energy is proud to be part of the RM Group, which boasts an extensive portfolio of hydropower projects across Nepal." },
});

export default mongoose.models.RMGroupContent ||
  mongoose.model<IRMGroupContent>("RMGroupContent", RMGroupContentSchema);
