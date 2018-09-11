// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const log = require('../logger');
const util = require('util');

// To see more detailed messages, uncomment the following line:
log.level = 'debug';

module.exports = function () {
  return context => {
    // This debugs the service call and a stringified version of the hook context
    // You can customize the message (and log) to your needs
    log.debug(`[${context.path}] ${context.method.toUpperCase()} ${context.type}`);
    
    if(typeof context.toJSON === 'function' && log.level === 'debug') {
      log.debug('Hook Context', util.inspect(context, { colors: true }));
    }
    
    if(context.error) {
      log.error(context.error.stack);
    }
  };
};
