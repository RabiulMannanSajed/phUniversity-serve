import path from 'path';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  // here this in the student interface this is hold the value of admissionSemester
  // then in this  admissionSemester this is hold the value
  const result = await Student.find().populate('admissionSemester');
  // add this after some update
  // .populate({
  //   path: 'admissionDepartment',
  //   populate: {
  //     path: 'admissionFaculty',
  //   },
  // });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
