import mongoose from 'mongoose';
import QueryBuild from '../../builder/QueryBuild';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';
import AppError from '../../middlewares/AppError';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuild(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

//  this is for update data of Faculty
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  // Object.keys(value)
  // -> static method returns an array of a given object's
  // const object1 = {
  //   a: 'some string',
  //   b: 42,
  //   c: false,
  // };

  // console.log(Object.keys(object1));
  // Expected output: Array ["a", "b", "c"]

  if (name && Object.keys(name).length) {
    // Object.entries(name) converts the name object into an array of key-value pairs
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //here we have to delete to thing user and faculty

    //delete the faculty
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(400, 'failed to delete the Faculty');
    }

    // here this  user is holding an ObjectId
    const userId = deletedFaculty.user;

    // delete the user
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    console.log(deletedUser);

    if (!deletedUser) {
      throw new AppError(400, 'failed to delete the Faculty User data');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error: any) {
    await session.commitTransaction();
    await session.endSession();

    throw new Error(error);
  }
};
export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
