// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  role: "owner" | "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: ["owner", "admin", "user"], default: "owner" }, // default owner per your request
  },
  { timestamps: true }
);

// Prevent model overwrite upon hot reloads in dev
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
