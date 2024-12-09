// this is the user type
// export type TUser = {
//   id: string;
//   password: string;
//   role: 'admin' | 'student' | 'faculty';
//   needsPasswordChange?: boolean;
//   isDeleted: boolean;
//   status: 'in-progress' | 'blocked';
// };
//* to read the static model
//* https://mongoosejs.com/docs/typescript/statics-and-methods.html

import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  role: 'admin' | 'student' | 'faculty';
  needsPasswordChange?: boolean;
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
}

//*1st make the model and the function here
export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;

  isUserExistsByCustomId(id: string): Promise<TUser>;
  // isUserDeleted(id: string, isDeleted: boolean): Promise<TUser>;

  isPasswordMatched(
    plaintextPass: string,
    hashedPass: string,
  ): Promise<boolean>;
}
