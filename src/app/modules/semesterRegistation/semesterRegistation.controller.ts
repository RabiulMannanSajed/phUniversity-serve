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

export const SemesterRegistrationController = {
  createSemesterRegistration,
};
