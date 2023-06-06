import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/Users/user.route';

const app: Application = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//* Application Routes
app.use('/api/v1/users', UserRoutes);

//* Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger');
// });

//* Global Error Handler
app.use(globalErrorHandler);

export default app;
