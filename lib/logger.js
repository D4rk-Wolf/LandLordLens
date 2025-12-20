/**
 * Server-side Logger Utility
 * Centralized logging for Node.js/Express server
 */

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  log(level, message, error = null) {
    if (!isDevelopment && level === 'debug') {
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    switch (level) {
      case 'error':
        console.error(logMessage, error || '');
        break;
      case 'warn':
        console.warn(logMessage, error || '');
        break;
      case 'info':
        if (isDevelopment) {
          console.info(logMessage);
        }
        break;
      case 'debug':
        if (isDevelopment) {
          console.debug(logMessage);
        }
        break;
      default:
        console.log(logMessage);
    }
  }

  error(message, error = null) {
    this.log('error', message, error);
  }

  warn(message, error = null) {
    this.log('warn', message, error);
  }

  info(message) {
    this.log('info', message);
  }

  debug(message) {
    this.log('debug', message);
  }
}

module.exports = new Logger();
