import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //set student role

  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.id = '0123456';

  //Create a user
  const newUser = await User.create(userData);
  // Create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
