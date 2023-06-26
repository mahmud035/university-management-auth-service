'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const academicDepartment_route_1 = require('../modules/academicDepartment/academicDepartment.route');
const academicFaculty_route_1 = require('../modules/academicFaculty/academicFaculty.route');
const academicSemester_route_1 = require('../modules/academicSemester/academicSemester.route');
const user_route_1 = require('../modules/user/user.route');
const student_route_1 = require('../modules/student/student.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemester_route_1.AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFaculty_route_1.AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartment_route_1.AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: student_route_1.StudentRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
// Before:
// router.use('/users', UserRoutes);
// router.use('/academic-semesters', AcademicSemesterRoutes);
exports.default = router;
