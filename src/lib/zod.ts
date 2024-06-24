import z from 'zod';

export const SignUpSchema = z.object({
  username: z.string().min(3).max(20),
  displayName: z.string().min(3).max(20),
  birthDay: z.string(),
  location: z.string().max(60).optional(),
  bio: z.string().max(200).optional(),
});

export type SignUp = z.infer<typeof SignUpSchema>;
