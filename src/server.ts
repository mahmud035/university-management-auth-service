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
require('colors');

//* Database Connection
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    logger.info(`Database Connected`);

    // console.log(`Database Connected`.yellow.italic);

    app.listen(config.port, () => {
      logger.info(`Server Up and Running`);

      // console.log(`Server Up and Running`.cyan.bold);
    });
  } catch (error: any) {
    errorLogger.error(`Failed to connect database`, error);

    // console.log(console.log(error.name.bgRed, error.message.bold, error.stack));
  }
};

dbConnect();
