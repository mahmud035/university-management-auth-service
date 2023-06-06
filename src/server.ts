/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { Color } from 'colors';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';
require('colors');

//* Handle Uncaught Exception
process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception is detected...');

  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

//* Database Connection
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    logger.info(`Database Connected`.yellow.italic);

    server = app.listen(config.port, () => {
      logger.info(`Server Up and Running`.cyan.bold);
    });
  } catch (error: any) {
    errorLogger.error(`Failed to connect database`, error);
  }

  //* Handle Unhandled Rejection
  process.on('unhandledRejection', (error) => {
    console.log(
      'Unhandled Rejection is detected, we are closing our server...'
    );

    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

dbConnect();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');

  if (server) {
    server.close();
  }
});
