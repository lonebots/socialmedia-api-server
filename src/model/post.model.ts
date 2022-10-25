import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "../model/user.model";

// post document interface
export interface PostDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  body: string;
  createdAt: Date;
  updateAt: Date;
}

// create a post schema
const PostSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: true },
    body: { type: String, default: true },
  },
  {
    timestamps: true,
  }
);

// create instance of the model
const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;
