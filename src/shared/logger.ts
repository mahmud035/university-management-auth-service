import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp as string | number);
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${
    date.toISOString().split('T')[0]
  } ${hour}:${minutes}:${seconds} [${label}] ${level.toUpperCase()}: ${message}`;
});

// Success logger
export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'APP' }), timestamp(), logFormat),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), logFormat), // Colorized logs for console
    }),
    // Daily rotate file for success logs
    new DailyRotateFile({
      dirname: path.join(process.cwd(), 'logs', 'winston', 'successes'),
      filename: 'app-%DATE%-success.log',
      datePattern: 'YYYY-MM-DD', // Standard date pattern
      zippedArchive: true,
      maxSize: '20m', // 20 MB
      maxFiles: '3d', // Retain logs for 3 days
    }),
  ],
});

// Error logger
export const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'ERROR' }),
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), logFormat),
    }),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'app-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '3d',
    }),
  ],
});

/**
 * 📂 logs/winston/
 *  📂 successes/
 *      📄 app-%DATE%-success.log
 *  📂 errors/
 *      📄 app-%DATE%-error.log
 *      📄 app-%DATE%-exceptions.log
 *      📄 app-%DATE%-rejections.log
 */
