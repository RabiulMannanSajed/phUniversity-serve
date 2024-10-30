import { RequestHandler } from 'express';
import { AcademicSemesterServices } from './academincSemester.service';
import sendResponse from '../../utlis/sendResponse';
import catchAsync from '../../utlis/catchAsync';

// TODO : make this controller
const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester created SuccessFully',
    data: result,
  });
});

const getAllAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result =
      await AcademicSemesterServices.getAllAcademicSemesterFromDB();

    res.status(200).json({
      success: true,
      message: 'All Academic Semester are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { academicSemesterId } = req.params;
    const result =
      await AcademicSemesterServices.singleAcademicSemesterFromDB(
        academicSemesterId,
      );
    res.status(200).json({
      success: true,
      message: 'Academic semester is  retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
};
