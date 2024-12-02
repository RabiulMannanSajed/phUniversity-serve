import AppError from '../../middlewares/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.modle';
import { TSemesterRegistration } from './semesterRegistation.interface';
import { SemesterRegistration } from './semesterRegistation.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check this semester is exists or not
  const isAcademicSemester = await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemester) {
    throw new AppError(404, 'this Academic Semester not found');
  }

  //   check if the semester already register
  const isSemesterRegistration = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistration) {
    throw new AppError(409, 'this Semester is already exist');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationIntoDB = async () => {};
const getSingleSemesterRegistrationIntoDB = async () => {};
const updateSemesterRegistrationIntoDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
