import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';

let server: Server;

//* Database Connection
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('✅ Database Connected');
    server = app.listen(config.port, () =>
      logger.info(`🚀 Server Up and Running`)
    );
  } catch (error) {
    const err = error as Error;
    errorLogger.error(`Failed to connect to database: ${err.message}`, {
      stack: err.stack,
    });
    process.exit(1);
  }
};

dbConnect();

process.on('uncaughtException', (error) => {
  errorLogger.error(`Uncaught Exception: ${error.message}`, {
    stack: error.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  errorLogger.error(`Unhandled Rejection: ${reason}`, {
    stack: reason instanceof Error ? reason.stack : null,
  });
  process.exit(1);
});

//* Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});
