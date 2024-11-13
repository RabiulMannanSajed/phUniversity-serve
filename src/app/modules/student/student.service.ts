import path from 'path';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../middlewares/AppError';
import { User } from '../user/user.model';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  //  here we run the search query
  const queryObj = { ...query };

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeField.forEach((el) => delete queryObj[el]); // this will do the exitly match

  // here this in the student interface this is hold the value of admissionSemester
  // then in this  admissionSemester this is hold the value
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  //*  this is sort query
  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  //* this is for the limit

  let limit = 1;
  let page = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit) as number;
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);
  console.log({ query }, { queryObj });
  //filed limiting
  let fields = '-__v';
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
    console.log({ fields });
  }
  const fieldsQuery = await limitQuery.select(fields);
  return fieldsQuery;
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

  //  this is for the
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true, // this will give u new data
    runValidators: true, // by this mongoose will start the validation again
  });

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
