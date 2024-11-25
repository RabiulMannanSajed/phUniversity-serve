import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/acdemincFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { CourseRoute } from '../modules/course/course.route';

// * this is our global route  here we make the main route of the
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },

  {
    path: '/students',
    route: StudentRoutes,
  },

  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },

  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },

  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },

  {
    path: '/faculty',
    route: FacultyRoutes,
  },

  {
    path: '/courses',
    route: CourseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
