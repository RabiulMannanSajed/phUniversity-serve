import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {});

const getSingleOfferedCourse = catchAsync(async (req, res) => {});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
};
