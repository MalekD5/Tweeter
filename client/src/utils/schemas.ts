import { ZodIssueCode, z } from 'zod';
import validator from 'validator';

const email = z.string().refine(validator.isEmail);
const password = z.string().refine(validator.isStrongPassword);

export const loginSchema = z.object({
  email,
  password,
  agree: z.boolean()
});

export const registerSchema = z
  .object({
    email,
    password,
    confirmPassword: password,
    username: z.string().refine(validator.isAlphanumeric),
    displayname: z.string().refine(validator.isAlphanumeric)
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ['password'],
        message: "passwords don't match"
      });
    }
  });

export const settingSchema = z.object({
  username: z.string().min(5).max(25).trim().refine(validator.isAlphanumeric),
  displayname: z
    .string()
    .min(5)
    .max(40)
    .trim()
    .refine(validator.isAlphanumeric),
  bio: z.string().min(0).max(280).trim().default('')
});
