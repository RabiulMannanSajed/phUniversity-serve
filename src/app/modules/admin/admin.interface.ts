import { Model, Types } from 'mongoose';

export type TAdminName = {
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

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  email: string;
  designation: string;
  gender: TGender;
  dataOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  //  find the Error of the presentAddress, permanentAddress if they are required  this data can't insert
  presentAddress?: string;
  permanentAddress?: string;
  profileImg?: string;
  isDelete: boolean;
};
export interface AdminModel extends Model<TAdmin> {
  isUserExits(id: string): Promise<TAdmin | null>;
}
