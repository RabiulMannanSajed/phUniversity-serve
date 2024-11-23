import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utlis/sendResponse';

//  This is for create a student
const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    // const ZodParsedData = studentValidationZodSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student is create successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { password, faculty: facultyData } = req.body;
    const result = await UserServices.createFacultyIntoDB(
      password,
      facultyData,
    );
    console.log(facultyData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculty is create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { password, admin: adminData } = req.body;
    const result = await UserServices.createAdminIntoDB(password, adminData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin is create successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
