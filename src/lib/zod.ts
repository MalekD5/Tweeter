import z from "zod";

export const SignUpSchema = z.object({
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

export type SignUp = z.infer<typeof SignUpSchema>;
