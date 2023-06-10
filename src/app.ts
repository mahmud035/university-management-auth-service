import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import ApplicationRoutes from './app/routes';

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

export default app;
