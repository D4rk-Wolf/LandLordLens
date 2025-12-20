/**
 * Logger Utility
 * Centralized logging with proper error handling
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  private log(level: LogLevel, message: string, error?: unknown): void {
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
    }
  }

  error(message: string, error?: unknown): void {
    this.log('error', message, error);
  }

  warn(message: string, error?: unknown): void {
    this.log('warn', message, error);
  }

  info(message: string): void {
    this.log('info', message);
  }

  debug(message: string): void {
    this.log('debug', message);
  }
}

export const logger = new Logger();
