import { RequestHandler } from 'express';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { facultyId } = req.params; // here take the id client want to update
  const { faculty } = req.body; // here the into of the faculty want to update
  const result = await FacultyServices.updateFacultyIntoDB(facultyId, faculty);

  res.status(200).json({
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});

const deletedFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Faculty Deleted successfully',
    data: result,
  });
});

// send all value here
export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deletedFaculty,
};
