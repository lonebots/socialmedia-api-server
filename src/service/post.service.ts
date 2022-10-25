import {
  DocumentDefinition,
  QueryOptions,
  FilterQuery,
  UpdateQuery,
} from "mongoose";

import Post, { PostDocument } from "../model/post.model";

// create
export async function createPost(input: DocumentDefinition<PostDocument>) {
  return Post.create(input);
}

// find
export async function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  return Post.findOne(query, {}, options); // projection object is left blank
}

// find and update
export async function findAndUpdate(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  return Post.findOneAndUpdate(query, update, options);
}

// delete the post

export async function deletePost(query: FilterQuery<PostDocument>) {
  return Post.deleteOne(query);
}
