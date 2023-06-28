/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { Color } from 'colors';
import { Server } from 'http';
require('colors');

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

    console.log(`Database Connected`.yellow.italic);

    server = app.listen(config.port, () => {
      console.log(`Server Up and Running`.cyan.bold);
    });
  } catch (error: any) {
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
    } else {
      process.exit(1);
    }
  });
};

dbConnect();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');

  if (server) {
    server.close();
  }
});
