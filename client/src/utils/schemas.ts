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
    confirmPassword: password
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
