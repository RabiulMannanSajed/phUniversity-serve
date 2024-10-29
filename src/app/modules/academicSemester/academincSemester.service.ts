import { create } from 'domain';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modle';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
