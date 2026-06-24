import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem {
  label: string;
  href: string;
  children?: IMenuItem[];
}

export interface INavigationMenu extends Document {
  items: IMenuItem[];
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    label: { type: String, required: true },
    href: { type: String, default: "#" },
    children: [],
  },
  { _id: false }
);

const NavigationMenuSchema = new Schema<INavigationMenu>({
  items: [MenuItemSchema],
});

export default mongoose.models.NavigationMenu ||
  mongoose.model<INavigationMenu>("NavigationMenu", NavigationMenuSchema);
