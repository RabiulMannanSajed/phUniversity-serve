import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// * this is the main
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  //type union letaral
  gender: 'male' | 'female' | 'other';
  email: string;
  dataOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: Types.ObjectId;
  admissionDepartment: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
};

// For creating Static
export interface StudentModel extends Model<TStudent> {
  isUserExits(id: string): Promise<TStudent | null>;
}

//  this part is for to check the user is present in the database //*for creating instance
// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
