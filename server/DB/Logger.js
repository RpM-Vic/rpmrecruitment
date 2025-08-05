import Log from './loggerSchema'

export class Logger {
  async basicLog(level, message, data ="") {
    try {
      await Log.create({
        priority: level.toLowerCase(),
        message,
        data: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Failed to write log:', err);
    }
  }

  static warn(message, data ="") {
    this.basicLog('warning', message, data);
  }

  static info(message, data ="") {
    this.basicLog('info', message, data);
  }

  static error(message, data ="") {
    this.basicLog('error', message, data);
  }
}
