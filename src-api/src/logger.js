const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('config');

const pid = format(info => { info.pid=process.pid; return info });

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'debug',
    filename: config.get('appName')+'.%DATE%.log',
    dirname: config.get('logDir'),
    maxSize: '5m',
    maxFiles: '7d',
    handleExceptions: true,
    format: format.combine(
      pid(),
      format.timestamp(),
      format.splat(),
      format.uncolorize(),
      format.json(),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: format.combine(
      format.timestamp({ format: 'DD-MMM-YY HH:mm:ss.SSS' }),
      format.splat(),
      format.colorize(),
      format.printf(log => `${log.timestamp} ${log.level}: ${log.message}`)
    ),
  },
};


// create the Winston logger with both transports (file, console)
const logger = createLogger({
  transports: [
    new DailyRotateFile(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});


// create a stream object with a 'write' function that will be used by `morgan` which logs all HTTP requests 
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message.trim());
  },
};

module.exports = logger;
