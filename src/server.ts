import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

//* Handle Uncaught Exception
process.on('uncaughtException', (error) => {
  console.log(`Uncaught Exception is detected...`, error);
  process.exit(1);
});

let server: Server;

//* Database Connection
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database Connected`);
    server = app.listen(config.port, () =>
      console.log(`Server Up and Running`)
    );
  } catch (error) {
    console.log(`Failed to connect database`, error);
  }

  //* Handle Unhandled Rejection
  process.on('unhandledRejection', (error) => {
    console.log(
      `Unhandled Rejection is detected, we are closing our server...`,
      error
    );

    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else process.exit(1);
  });
};

dbConnect();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) server.close();
});
