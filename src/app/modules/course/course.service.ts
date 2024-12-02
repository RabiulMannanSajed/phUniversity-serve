import mongoose from 'mongoose';
import QueryBuild from '../../builder/QueryBuild';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../middlewares/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuild(
    Course.find(),
    // .populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      //* session -1
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(400, 'Failed to update Course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //* filter out the deleted fields
      const deletedPreRequisite = preRequisiteCourses
        .filter((value) => value.course && value.isDeleted) // here we find those id as isDeleted field
        .map((value) => value.course); // and find the id here
      console.log(deletedPreRequisite);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        //* session -2
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(400, 'Failed to update Course');
      }

      //*  this is for add preRequisiteCourses
      const newPreRequisites = preRequisiteCourses?.filter(
        (value) => value.course && !value.isDeleted,
      );
      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        //* session -3
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisitesCourses) {
        throw new AppError(400, 'Failed to update Course');
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'failed to update course');
  }

  // this is for delete preRequisiteCourses
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      // here we need upset true,cause first time there will not user after add someone then become there will add more user
      upsert: true,
      new: true,
    },
  );
  return result;
};
const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      // here we need upset true,cause first time there will not user after add someone then become there will add more user
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
