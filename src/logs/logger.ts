import path from 'path';
import winston from 'winston';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = path.join(__dirname, 'logfiles');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const transport = new DailyRotateFile({
  filename: path.join(logDirectory, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
    }),
    transport,
  ],
});

export default logger;
