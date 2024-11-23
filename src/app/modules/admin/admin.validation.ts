import { z } from 'zod';

const createAdminUserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'first name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last name is required'),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    admin: z.object({
      name: createAdminUserNameValidationSchema,
      designation: z.string().min(1, 'designation is required'),
      gender: z.enum(['male', 'female', 'other']),
      email: z.string().email('Invalid email address'),
      dataOfBirth: z.string().optional(),
      contactNo: z.string().min(1, 'Contact no is required'),
      emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    }),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

const updateAdminUserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'first name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last name is required'),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    admin: z.object({
      name: updateAdminUserNameValidationSchema,
      designation: z.string().min(1, 'designation is required'),
      gender: z.enum(['male', 'female', 'other']),
      email: z.string().email('Invalid email address'),
      dataOfBirth: z.string().optional(),
      contactNo: z.string().min(1, 'Contact no is required'),
      emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    }),
    presentAddress: z.string().min(1, 'Present address is required'),
    permanentAddress: z.string().min(1, 'Present address is required'),
    profileImg: z.string().optional(),
  }),
});
export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
