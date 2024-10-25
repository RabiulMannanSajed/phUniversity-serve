import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // const ZodParsedData = studentValidationZodSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: 'Student is create successfully',
      data: result,
    });
  } catch (error: any) {
    //! this error will show in the console
    // console.log(error);
    //! to show the Error in the postman console
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong ',
      error: error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
