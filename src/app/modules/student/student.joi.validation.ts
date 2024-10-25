// import Joi, { required } from 'Joi';

// // ! Data validation by joi
// // Create a schema validation using the joi
// const userNameValidationSchema = Joi.object({
//   firstName: Joi.string().trim().required().messages({
//     'string.empty': 'First Name is required',
//   }),
//   middleName: Joi.string().trim().allow(''),
//   lastName: Joi.string().trim().required().messages({
//     'string.empty': 'Last Name is required',
//   }),
// });

// // Guardian Joi schema
// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().trim().required().messages({
//     'string.empty': 'Father Name is required',
//   }),
//   fatherOccupation: Joi.string().trim().required().messages({
//     'string.empty': 'Father Occupation is required',
//   }),
//   fatherContactNo: Joi.string().trim().required().messages({
//     'string.empty': 'Father Contact No is required',
//   }),
//   motherName: Joi.string().trim().required().messages({
//     'string.empty': 'Mother Name is required',
//   }),
//   motherOccupation: Joi.string().trim().required().messages({
//     'string.empty': 'Mother Occupation is required',
//   }),
//   motherContactNo: Joi.string().trim().required().messages({
//     'string.empty': 'Mother Contact No is required',
//   }),
// });

// // Local Guardian Joi schema
// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string().trim().required().messages({
//     'string.empty': 'Local Guardian Name is required',
//   }),
//   occupation: Joi.string().trim().required().messages({
//     'string.empty': 'Local Guardian Occupation is required',
//   }),
//   contactNo: Joi.string().trim().required().messages({
//     'string.empty': 'Local Guardian Contact No is required',
//   }),
//   address: Joi.string().trim().required().messages({
//     'string.empty': 'Local Guardian Address is required',
//   }),
// });
// // Main Student Joi schema
// const studentValidationSchema = Joi.object({
//   id: Joi.string().required().messages({
//     'string.empty': 'ID is required',
//   }),

//   name: userNameValidationSchema.required(),

//   gender: Joi.string().valid('male', 'female', 'other').required().messages({
//     'any.only': '{#value} is not a valid gender',
//     'string.empty': 'Gender is required',
//   }),
//   dataOfBirth: Joi.string(),
//   email: Joi.string().email().required().messages({
//     'string.empty': 'Email is required',
//     'string.email': '{#value} is not a valid email',
//   }),
//   contactNo: Joi.string().trim().required().messages({
//     'string.empty': 'Contact No is required',
//   }),
//   emergencyContactNo: Joi.string().trim().required().messages({
//     'string.empty': 'Emergency Contact No is required',
//   }),
//   bloodGroup: Joi.string()
//     .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
//     .optional(),
//   presentAddress: Joi.string().required(),
//   permanentAddress: Joi.string().required(),
//   guardian: guardianValidationSchema.required(),
//   localGuardian: localGuardianValidationSchema.required(),
//   profileImg: Joi.string().optional(),
//   isActive: Joi.string().valid('active', 'inactive').default('active'),
// });
// export default studentValidationSchema;
