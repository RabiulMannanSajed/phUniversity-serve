import { z } from 'zod';

const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Winter']),
  }),
});

export const academicSemesterValidation = {
  academicSemesterValidationSchema,
};
