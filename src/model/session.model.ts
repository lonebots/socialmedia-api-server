import mongoose, { mongo } from "mongoose";
import { boolean, object, ref, string } from "yup";
import { UserDocument } from "./user.model";

// define interface
export interface sessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

// create a session schema
const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

// create user session instance
const User = mongoose.model<sessionDocument>("Session", sessionSchema);

export default User;
