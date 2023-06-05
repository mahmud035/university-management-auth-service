import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import usersRoutes from '../src/app/modules/Users/users.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//* Application Routes
app.use('/api/v1/users', usersRoutes);

//* Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully ');
//   // throw new Error('Ora baba error');
//   // throw new ApiError(400, 'Ora baba error');
//   // next('Ora baba error'); // Error
// });

//* Global Error Handler
app.use(globalErrorHandler);

export default app;
