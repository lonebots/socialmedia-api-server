import mongoose from "mongoose";
import bcrypt from "bcrypt"; // for creating password hash
import config from "config";
import { NextFunction } from "express";

// since we are using typescript an interface is also required for the user
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: String): Promise<boolean>;
}

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

// userschema pre save method - to get the user password in to a hash
UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  // only hash the password if its been modified (or new)
  if (!user.isModified("password")) return next();

  // random additional data 
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  // generate the hash
  const hash = await bcrypt.hashSync(user.password, salt)

  // replace the password with the hash
  user.password = hash

  // call the next function
  return next();
});

// user document methods - for loging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// create a new user variable
// the custom interface helps in getting back the model build the instance with that reference.
// if we don't pass anything we get an empty schema that extends documents.
const User = mongoose.model<UserDocument>("User", UserSchema);

// export the created user variable
export default User;
