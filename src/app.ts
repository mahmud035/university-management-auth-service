import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

const app: Application = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//* Application Routes

app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully ');
});

export default app;
