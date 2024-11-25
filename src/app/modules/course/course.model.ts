import { model, Schema, Types } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.ObjectId,
    ref: 'Course',
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
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

  preRequisiteCourses: [preRequisiteCoursesSchema],

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model<TCourse>('Course', courseSchema);
