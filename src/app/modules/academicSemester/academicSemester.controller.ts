import { RequestHandler } from 'express';
import { AcademicSemesterServices } from './academincSemester.service';
import sendResponse from '../../utlis/sendResponse';

// TODO : make this controller
const createAcademicSemester: RequestHandler = async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester created SuccessFully',
    data: result,
  });
};

const getAllAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const result =
      await AcademicSemesterServices.getAllAcademicSemesterFromDB();

    res.status(200).json({
      success: true,
      message: 'All Academic Semester is are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleAcademicSemester: RequestHandler = async (req, res, next) => {
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
};
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
};
