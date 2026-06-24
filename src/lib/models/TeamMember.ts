import mongoose, { Schema, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  category: "board" | "management";
  bio: string;
  image: string;
  order: number;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  category: { type: String, enum: ["board", "management"], default: "board" },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
