import path from 'path';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../middlewares/AppError';
import { User } from '../user/user.model';

const getAllStudentFromDB = async () => {
  // here this in the student interface this is hold the value of admissionSemester
  // then in this  admissionSemester this is hold the value
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate('admissionSemester');
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  const result = await Student.findOneAndUpdate({ id }, payload);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // const deletedStudent = await Student.updateOne({ id }, { isDeleted: true });

    // here we updating our genId that's why we use the findOneAndUpdate
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }, // in update Transaction this is return an object
    );
    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete the student');
    }

    //  we also delete the same user

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete the user  ');
    }

    //if all process is successfully done the commit and end the session
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    //if any of the process is failed to  done the commit and end the session

    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to  delete student');
  }
};

export const StudentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
