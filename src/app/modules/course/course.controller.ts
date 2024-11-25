import { RequestHandler } from 'express';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { CourseServices } from './course.service';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course created SuccessFully',
    data: result,
  });
});

const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Courses are retrieved SuccessFully',
    data: result,
  });
});

const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is retrieved SuccessFully',
    data: result,
  });
});

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is delete  SuccessFully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
