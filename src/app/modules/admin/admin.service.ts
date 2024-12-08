import mongoose from 'mongoose';
import QueryBuild from '../../builder/QueryBuild';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../middlewares/AppError';
import { User } from '../user/user.model';

const getAllAdminFromDb = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuild(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminFromDb = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(400, 'failed to delete the Admin');
    }

    // here this  user is holding an ObjectId
    const UserId = deletedAdmin.user;
    const deletedUser = await User.findOneAndUpdate(
      UserId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete the Admin user Data');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const adminServices = {
  getAllAdminFromDb,
  getSingleAdminFromDB,
  updateAdminFromDb,
  deleteAdminFromDB,
};
