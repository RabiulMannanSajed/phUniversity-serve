import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './academicSemester.constat';

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Month,
  },
  endMonth: {
    type: String,
    enum: Month,
    required: true,
  },
});

// here we check the  semester( spring 02 2023 ) in the same year (Autumn 02 2023) not possible
// so we will check the model before it's save
AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    // this (this mean the document we send right now )
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new Error('This semester already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  AcademicSemesterSchema,
);
