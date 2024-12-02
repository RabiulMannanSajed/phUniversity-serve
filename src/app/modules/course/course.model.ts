import { model, Schema, Types } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.ObjectId,
      ref: 'Course',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Add the course Name'],
    },

    prefix: {
      type: String,
      trim: true,
      required: [true, 'Add the course prefix'],
    },

    code: {
      type: Number,
      trim: true,
      required: [true, 'Add the course Code '],
    },
    credits: {
      type: Number,
      trim: true,
      required: [true, 'Add the course credits '],
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', courseSchema);

const CourseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  CourseFacultySchema,
);
