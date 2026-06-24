import mongoose, { Schema, Document } from "mongoose";

export interface IChairmanMessage extends Document {
  name: string;
  title: string;
  message: string;
  image: string;
}

const ChairmanMessageSchema = new Schema<IChairmanMessage>({
  name: { type: String, default: "Mr. Krishna Acharya" },
  title: { type: String, default: "RM Group Chairman / Chief of Management" },
  message: { type: String, default: "As the Chairman of the RM Group and Chief of Management for Balephi Energy, I am proud to oversee our journey toward making Nepal self-reliant in energy production. Our commitment extends beyond generating power; we aim to uplift communities, protect the environment, and foster economic growth across the nation through sustainable hydropower development." },
  image: { type: String, default: "https://rmgroup.com.np/images/krishnasir.jpg" },
});

export default mongoose.models.ChairmanMessage || mongoose.model<IChairmanMessage>("ChairmanMessage", ChairmanMessageSchema);
