import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    require: [true, 'First Name is required'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    require: [true, 'Last Name is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,

    //! this trim use to when any space in the data front and the back
    trim: true,

    required: [true, 'father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'father Contact No is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'mother Name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'mother Contact No is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'local Guardian Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'local Guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'local Guardian contactNo  is required'],
  },
  address: {
    type: String,
    required: [true, 'local Guardian address is required'],
  },
});

const firstName = { toJSON: { virtuals: true } };
// This is the main schema
// this is when  creating instance
// export const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(

// This is when use Static
export const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      // to connect student and user use the ref
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: true,
    },

    //    Mongoss give u to set the type as u want this is call enum
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        // here if VALUE is this the value of user want to enter the value in the database
        message: '{VALUE} is not valid',
      },
      required: true,
    },

    dataOfBirth: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{value}  is not a valid email',
      },
    },

    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },

    guardian: {
      type: guardianSchema,
      required: true,
    },

    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },

    profileImg: {
      type: String,
      default: undefined,
    },

    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  // firstName,
  //  this an another way to use the virtual
  { toJSON: { virtuals: true } },
);

// Virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//!creating a custom statics method
studentSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// * this fnc is for check the user exist or not

// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

//* Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//  this is the student model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
