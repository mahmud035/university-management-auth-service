'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require('zod');
const academicSemester_constant_1 = require('./academicSemester.constant');
const createAcademicSemesterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterTitles],
      {
        required_error: 'Title is required',
      }
    ),
    year: zod_1.z.string({
      required_error: 'Year is required',
    }),
    code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes], {
      required_error: 'Code is required',
    }),
    startMonth: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterMonths],
      {
        required_error: 'Start Month is required',
      }
    ),
    endMonth: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterMonths],
      {
        required_error: 'End Month is required',
      }
    ),
  }),
});
// NOTE: Ensure 1: Route Level: Update --> If you want to update title or code, then you need to provide both title and code field value; otherwise you can't update only title or only code field. Then you can update other fields; not title or code.
const updateAcademicSemesterZodSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      title: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterTitles], {
          required_error: 'Title is required',
        })
        .optional(),
      year: zod_1.z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterCodes], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterMonths], {
          required_error: 'Start Month is required',
        })
        .optional(),
      endMonth: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterMonths], {
          required_error: 'End Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    (data) =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message:
        'Either both title and code field must be provided or neither. Update other fields',
    }
  );
exports.AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
