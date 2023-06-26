'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
);
const routes_1 = __importDefault(require('./app/routes'));
const http_status_1 = __importDefault(require('http-status'));
const app = (0, express_1.default)();
//* Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
//* Application Routes
app.use('/api/v1', routes_1.default);
// Before:
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
//* Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger');
// });
//* Global Error Handler
app.use(globalErrorHandler_1.default);
//* Handle Not Found Route
app.use((req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});
exports.default = app;
