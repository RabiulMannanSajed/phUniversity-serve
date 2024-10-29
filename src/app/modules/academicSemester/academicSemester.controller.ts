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

export const AcademicSemesterController = {
  createAcademicSemester,
};
