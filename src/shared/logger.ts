import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf } = format;

// Custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  // Ensure `timestamp` is a valid string or number
  if (typeof timestamp !== 'string' && typeof timestamp !== 'number') {
    throw new Error('Invalid timestamp format');
  }

  const date = new Date(timestamp);
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${
    date.toISOString().split('T')[0]
  } ${hour}:${minutes}:${seconds} [${label}] ${level.toUpperCase()}: ${message}`;
});

// Success Logger
export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'APP' }), timestamp(), myFormat),
  transports: [
    // Console Transport
    new transports.Console({
      format: combine(format.colorize(), myFormat), // Colorized logs for console
    }),
    // Daily Rotate File for Success Logs
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'app-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD', // Standard date pattern
      zippedArchive: true,
      maxSize: '20m', // 20MB
      maxFiles: '3d', // Retain logs for 3 days
    }),
  ],
});

// Error Logger
export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'ERROR' }), timestamp(), myFormat),
  transports: [
    // Console Transport
    new transports.Console({
      format: combine(format.colorize(), myFormat), // Colorized logs for console
    }),
    // Daily Rotate File for Error Logs
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'app-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD', // Standard date pattern
      zippedArchive: true,
      maxSize: '20m', // 20MB
      maxFiles: '3d', // Retain error logs for 3 days
    }),
  ],
});

// logs/winston/
// successes/success.log
// errors/error.log
