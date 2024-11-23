import { z } from 'zod';

// this will apply when create the faculty
const createFacultyUserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'first name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last name is required'),
});
export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      name: createFacultyUserNameValidationSchema,
      designation: z.string().min(1, ' designation is required'),
      gender: z.enum(['male', 'female', 'other']),
      email: z.string().email('Invalid email address'),
      dataOfBirth: z.string().optional(),
      contactNo: z.string().min(1, 'Contact No is required'),
      emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string(),
    }),
  }),
});

// this will apply when update the faculty

const updateFacultyUserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'first name is required').optional(),
  middleName: z.string().trim().optional().optional(),
  lastName: z.string().trim().min(1, 'Last name is required').optional(),
});
export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: updateFacultyUserNameValidationSchema,
      designation: z.string().min(1, ' designation is required').optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      email: z.string().email('Invalid email address').optional(),
      dataOfBirth: z.string().optional(),
      contactNo: z.string().min(1, 'Contact No is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact No is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});
export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
