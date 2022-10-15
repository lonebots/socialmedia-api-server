import mongoose from "mongoose";
import bcrypt from "bcrypt"; // for creating password hash
import config from "config";

// create schema - put in the objects and the options
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  }, // user-schema-objects
  {
    timestamps: true,
  } // user-schema-options
);
