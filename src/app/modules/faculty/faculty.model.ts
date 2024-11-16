import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty, TFacultyName } from './faculty.interface';
import validator from 'validator';
import { StudentModel } from '../student/student.interface';

const facultyUserNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'first name is required'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'last name is required'],
  },
});
const firstName = { toJSON: { virtuals: true } };

export const facultySchema = new Schema<TFaculty, FacultyModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: facultyUserNameSchema,
    required: true,
  },
  designation: {
    type: String,
    required: [true, 'designation is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{value} is not valid',
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{value} is not a valid email',
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
});

export const Faculty = model<TFaculty, StudentModel>('Faculty', facultySchema);
