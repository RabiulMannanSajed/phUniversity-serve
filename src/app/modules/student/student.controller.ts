import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationZodSchema from './student.validation';
// import Joi, { required } from 'Joi';
//  This is for create a student

// This is for get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students is are retrieved successfully',
      data: result,
    });
  } catch (error) {
    //! this error will show in the console
    // console.log(error);
    //! to show the Error in the postman console
    res.status(500).json({
      success: false,
      message: 'Something went wrong ',
      error: error,
    });
  }
};

// This is for get one student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is are retrieved successfully',
      data: result,
    });
  } catch (error) {
    //! this error will show in the console
    // console.log(error);
    //! to show the Error in the postman console
    res.status(500).json({
      success: false,
      message: 'Something went wrong ',
      error: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (error) {
    //! this error will show in the console
    // console.log(error);
    //! to show the Error in the postman console
    res.status(500).json({
      success: false,
      message: 'Something went wrong ',
      error: error,
    });
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
