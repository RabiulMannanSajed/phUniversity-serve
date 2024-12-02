import { RequestHandler } from 'express';
import catchAsync from '../../utlis/catchAsync';
import { SemesterRegistrationService } from './semesterRegistation.service';
import sendResponse from '../../utlis/sendResponse';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'semester registration is created SuccessFully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationIntoDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Semester Registration is retrieved successfully  ',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Semester Registration is retrieved successfully  ',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Semester Registration is retrieved successfully  ',
    data: result,
  });
});
export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};
