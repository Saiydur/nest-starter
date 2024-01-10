import { Default } from './env.interface';

export const ServerConfig: Default = {
  env: process.env.APP_ENV || 'default',
  port: Number(process.env.APP_PORT) || 3000,
  logLevel: process.env.LOG_LEVEL || 'debug',
  logFormat: process.env.LOG_FORMAT || 'dev',
  logFile: process.env.LOG_FILE || 'logs/default.log',
  db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'api',
    max: Number(process.env.DB_MAX_CONNECTIONS) || 20,
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT) || 30000,
    connectionTimeoutMillis: Number(process.env.DB_CONN_TIMEOUT) || 2000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || 'redis',
    db: Number(process.env.REDIS_DB) || 0,
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.ethereal.email',
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER || 'abcd@gmail.com',
      pass: process.env.MAIL_PASSWORD || 'abcd',
    },
  },
  httpsOptions: {
    key: process.env.HTTPS_KEY || '',
    cert: process.env.HTTPS_CERT || '',
  },
};
