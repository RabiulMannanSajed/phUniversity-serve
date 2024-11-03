import { z } from 'zod';

// Define the Zod Validationschema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last Name is required'),
});

// Define the Zod Validationschema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father Name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().trim().min(1, 'Father Contact No is required'),
  motherName: z.string().trim().min(1, 'Mother Name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().trim().min(1, 'Mother Contact No is required'),
});

// Define the Zod  for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1, 'Local Guardian Occupation is required'),
  contactNo: z.string().min(1, 'Local Guardian Contact No is required'),
  address: z.string().min(1, 'Local Guardian Address is required'),
});

// Define the Zod  for Student
export const createStudentValidationZodSchema = z.object({
  body: z.object({
    // here this password is coming from the
    password: z.string(),

    //  this is the value if student obj so make it inside the student obj
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email address'),
      contactNo: z.string().min(1, 'Contact No is required'),
      emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      admissionDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationZodSchema,
};
