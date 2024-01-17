import path from 'path';
import winston from 'winston';

const logDirectory = path.join(__dirname, 'logfiles');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'combined.log'),
    }),
  ],
});

export default logger;
