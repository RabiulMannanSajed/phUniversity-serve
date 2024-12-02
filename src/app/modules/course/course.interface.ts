import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourses];
  isDeleted?: boolean;
};
export type TCourseFaculty = {
  course: Types.ObjectId;

  //* here use an array cause multyple faculty can take a course
  faculties: [Types.ObjectId];
};
