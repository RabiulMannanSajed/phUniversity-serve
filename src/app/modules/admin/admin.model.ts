import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin, TAdminName } from './admin.interface';
import validator from 'validator';

// here we make the schema and use the our validation
const adminUserNameSchema = new Schema<TAdminName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'first name is required '],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'first name is required '],
  },
});
const adminSchema = new Schema<TAdmin, AdminModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: adminUserNameSchema,
    required: [true, 'Name is required'],
  },
  designation: {
    type: String,
    required: [true, 'Designation is required '],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{value} is not valid',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{value} is not valid ',
    },
  },
  dataOfBirth: {
    type: String,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  profileImg: {
    type: String,
  },
  presentAddress: {
    type: String,
    // required: true,
  },
  permanentAddress: {
    type: String,
    // required: [true, 'Address is required'],
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});
export const Admin = model<TAdmin, AdminModel>('admin', adminSchema);
