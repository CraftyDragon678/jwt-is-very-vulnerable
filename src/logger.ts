import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

const consoleFormat = format.printf(
  ({ level, message, label, timestamp, ms, ...extra }) =>
    `${chalk.cyan(timestamp)} ${chalk.gray(ms)} [${chalk.yellow(
      label,
    )}] ${level}: ${message}${
      Object.keys(extra).length !== 0
        ? ` ${JSON.stringify(extra, undefined, 2)}`
        : ''
    }`,
);

const logWithNoColor = format.printf(
  ({ level, message, label, timestamp, ...extra }) =>
    `${timestamp} [${label}] ${level}: ${message}${
      Object.keys(extra).length !== 0 ? ` ${JSON.stringify(extra)}` : ''
    }`,
);

const createLabeledLogger = (label: string) =>
  createLogger({
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }),
      format.splat(),
      format.label({ label }),
      logWithNoColor,
    ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log', level: 'verbose' }),
      ...(process.env.NODE_ENV !== 'production'
        ? [
            new transports.Console({
              format: format.combine(
                format.colorize(),
                format.ms(),
                consoleFormat,
              ),
              level: 'silly',
            }),
          ]
        : []),
    ],
  });

const logger = createLabeledLogger('DEFAULT');

process.on('unhandledRejection', (error) => {
  logger.error((error as Error).stack);
});

export default logger;
