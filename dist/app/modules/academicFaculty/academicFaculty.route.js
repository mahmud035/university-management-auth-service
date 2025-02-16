"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post('/create-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.createFacultyZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLL.SUPER_ADMIN, user_1.ENUM_USER_ROLL.ADMIN), academicFaculty_controller_1.AcademicFacultyController.createFaculty);
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.updateFacultyZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLL.SUPER_ADMIN, user_1.ENUM_USER_ROLL.ADMIN, user_1.ENUM_USER_ROLL.FACULTY), academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLL.SUPER_ADMIN, user_1.ENUM_USER_ROLL.ADMIN), academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLL.SUPER_ADMIN, user_1.ENUM_USER_ROLL.ADMIN, user_1.ENUM_USER_ROLL.FACULTY, user_1.ENUM_USER_ROLL.STUDENT), academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLL.SUPER_ADMIN, user_1.ENUM_USER_ROLL.ADMIN, user_1.ENUM_USER_ROLL.STUDENT), academicFaculty_controller_1.AcademicFacultyController.getAllFaculties);
exports.AcademicFacultyRoutes = router;
