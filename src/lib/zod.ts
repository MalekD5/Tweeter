import z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/g),
  displayName: z.string().min(3).max(20),
  birthDay: z.date(),
  location: z.string().max(60).optional(),
  bio: z.string().max(200).optional(),
});

export const postTweetSchema = z.object({
  text: z.string().min(1).max(250),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type PostTweetSchema = z.infer<typeof postTweetSchema>;
