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

//* Database Connection
const dbConnect = async () => {
  let server: Server;

  try {
    await mongoose.connect(config.database_url as string);

    logger.info(`Database Connected`.yellow.italic);

    server = app.listen(config.port, () => {
      logger.info(`Server Up and Running`.cyan.bold);
    });
  } catch (error: any) {
    errorLogger.error(`Failed to connect database`, error);
  }

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
