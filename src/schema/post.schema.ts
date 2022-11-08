import { object, string, ref } from "yup";

// parameters for the schema
const params = {
  params: object({
    postId: string().required("postId is required!"),
  }),
};
// payloads for the schema
const payload = {
  body: object({
    title: string().required("Title is required!"),
    body: string()
      .required("Body is required!")
      .min(10, "Body is too short - minimum 10 characters required."),
  }),
};

// postCrearionSchema
export const createPostSchema = object({
  ...payload,
});

// updatePostSchema
export const updatePostSchema = object({
  ...params,
  ...payload,
});

// deletePostSChema
export const deletePostSChema = object({
  ...params,
});
