import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';

const Month: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: ['Autumn', 'Summer', 'Winter'],
  },
  code: {
    type: String,
    enum: ['01', '02', '03'],
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Month,
  },
  endMonth: {
    type: String,
    enum: Month,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
