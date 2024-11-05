import { RequestHandler } from 'express';
import catchAsync from '../../utlis/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../utlis/sendResponse';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department created SuccessFully',
      data: result,
    });
  },
);

//*Get all the department info
const getAllAcademicDepartment: RequestHandler = async (req, res, next) => {
  try {
    const result =
      await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
    res.status(200).json({
      success: true,
      message: 'All Academic Department are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAcademicDepartment: RequestHandler = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
        departmentId,
      );
    res.status(200).json({
      success: true,
      message: 'The Academic Department is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAcademicDepartment: RequestHandler = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );
    res.status(200).json({
      success: true,
      message: 'This Academic Department Updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
