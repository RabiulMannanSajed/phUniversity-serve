import QueryBuild from '../../builder/QueryBuild';
import AppError from '../../middlewares/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.modle';
import { TSemesterRegistration } from './semesterRegistation.interface';
import { SemesterRegistration } from './semesterRegistation.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //    check if there any register semester that is upcoming and ongoing

  const isThereUpcomingOngoing = await SemesterRegistration.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });
  if (isThereUpcomingOngoing) {
    throw new AppError(
      502,
      `There is already a ${isThereUpcomingOngoing} semester`,
    );
  }
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

const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuild(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // if the requested register semester exists
  //   check if the semester already register
  const isSemesterRegistration = await SemesterRegistration.findById(id);

  if (!isSemesterRegistration) {
    throw new AppError(400, 'this Semester is not found');
  }

  // if the semester reg is ended ,we will not update anything
  const currentSemesterStatus = isSemesterRegistration.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      502,
      `this is semester is already ${currentSemesterStatus}`,
    );
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
