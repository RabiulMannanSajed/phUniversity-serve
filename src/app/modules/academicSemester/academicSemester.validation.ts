import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './academicSemester.constat';

const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]]),
  }),
});

export const academicSemesterValidation = {
  academicSemesterValidationSchema,
};
