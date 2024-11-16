import { Model, Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TFacultyName;
  designation: string;
  gender: TGender;
  email: string;
  dataOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
};
export interface FacultyModel extends Model<TFaculty> {
  isUserExits(id: string): Promise<TFaculty | null>;
}
