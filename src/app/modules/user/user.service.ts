import mongoose, { mongo } from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.modle';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../middlewares/AppError';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { any } from 'joi';

//  this is for student
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
  console.log(session);
  try {
    //2nd-> this is start the Transaction of the session
    session.startTransaction();

    //this is the id we generate by user login
    userData.id = await generateStudentId(admissionSemester);

    //Create a user(transaction-1)
    const newUser = await User.create([userData], { session });

    // Create a student
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create the student User ');
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
    throw new Error('Failed to create the student User');
  }
};

// this is for faculty

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(500, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

//  this is for an admin

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // here we have to make the user and and an admin
  const userData: Partial<TUser> = {};
  // in the user we set the pass and the role
  userData.password = password || config.default_password;
  userData.role = 'admin';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    // create a user Transaction-1
    const newUser = await User.create([userData], { session });

    //  Create as admin
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create the admin user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //  Create an admin (Transaction-2)
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(400, 'failed to create the Admin');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    //  if the transaction failed
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
