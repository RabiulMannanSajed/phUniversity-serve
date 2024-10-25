import { z } from 'zod';

const userValidationScheme = z.object({
  password: z
    .string()
    .max(20, { message: 'password can not be more then 20 char' })
    .optional(),
});

export const UserValidation = {
  userValidationScheme,
};
