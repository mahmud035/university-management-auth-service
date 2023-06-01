import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import usersRoutes from '../src/app/modules/Users/users.route';

const app: Application = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//* Application Routes
app.use('/api/v1/users', usersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully ');
});

export default app;
