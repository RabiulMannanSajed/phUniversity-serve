import { RequestHandler } from 'express';
import { AcademicFacultyService } from './academicFaculty.service';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';

const createAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Faculty created SuccessFully',
      data: result,
    });
  },
);

const getAllAcademicFaculties: RequestHandler = async (req, res, next) => {
  try {
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();

    res.status(200).json({
      success: true,
      message: 'All Academic Faculties are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);

    res.status(200).json({
      success: true,
      message: 'Academic Faculty is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAcademicFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: 'Academic Faculty is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
