import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentService } from './student.service';
import catchAsync from '../../utlis/catchAsync';

// This is for get all students
//  Here use the (Higher order function)
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDB();
  res.status(200).json({
    success: true,
    message: 'Students is are retrieved successfully',
    data: result,
  });
});

// This is for get one student
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Student is are retrieved successfully',
    data: result,
  });
});
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
