import mongoose, { mongo } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.modle';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../middlewares/AppError';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

//  this is for create the student
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //set student role
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  //1st create the session
  const session = await mongoose.startSession();

  try {
    //2nd-> this is start the Transaction of the session
    session.startTransaction();

    //this is the id we generate by user login
    userData.id = await generateStudentId(admissionSemester);

    //Create a user(transaction-1)
    const newUser = await User.create([userData], { session });

    // Create a student
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create the User ');
    }
    // set id , _id as user
    studentData.id = newUser[0].id;

    studentData.user = newUser[0]._id; //reference _id

    //Create a Student(transaction-2)
    const newStudent = await Student.create([studentData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create the Student');
    }

    //if every thing is of then  commit this the data in the transaction
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    // if transaction filed this abort this
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create the User');
  }
};

// this is for create the faculty

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  //if the user provide the pass or we can set the pass from the config file
  userData.password = password || config.default_password;
  userData.role = 'faculty';

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic Department not found ');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    const newUser = await User.create([payload], { session });

    //TODO make this code
    if (!newUser.length) {
      throw new AppError(502, 'Failed to create the Faculty ');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
