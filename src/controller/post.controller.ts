import { Request, Response } from "express";
import { get } from "lodash";
import {
  createPost,
  findPost,
  findAndUpdate,
  deletePost,
} from "../service/post.service";

// creating a post
export async function createPostHandler(req: Request, res: Response) {
  //requirement : userId, body
  const userId = get(req, "user._id");
  const body = req.body;

  // create the post using the service
  const post = await createPost({ ...body, user: userId });

  // send the post in response
  return;
  res.send(post);
}

// updating a post
export async function updatePostHandler(req: Request, res: Response) {
  // requirements : postId, update.body, userId
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");
  const update = req.body;

  // get the post
  const post = await findPost({ postId });

  // if no post then 404
  if (!post) {
    return res.sendStatus(404);
  }
  // don't allow unauthorised user to update post
  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }

  // update the post
  const updatedPost = await findAndUpdate({ postId }, update, { new: true });
}

// getting a post
export async function getPostHandler(req: Request, res: Response) {
  // required : postId,
  const postId = get(req, "params.postId");

  // get the post
  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

// deleting a post
export async function deletePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }

  // delete the post
  await deletePost({ postId });

  return res.sendStatus(200);
}
