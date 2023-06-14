import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import ApplicationRoutes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//* Application Routes
app.use('/api/v1', ApplicationRoutes);

// Before:
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

//* Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger');
// });

//* Global Error Handler
app.use(globalErrorHandler);

//* Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });

  next();
});

export default app;
