export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
  db: number;
}

export interface MailAuthConfig {
  user: string;
  pass: string;
}

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: MailAuthConfig;
}

export interface HttpsConfig {
  key: string;
  cert: string;
}

export interface Default {
  env: string;
  port: number;
  logLevel: string;
  logFormat: string;
  logFile: string;
  db: DatabaseConfig;
  jwt: JwtConfig;
  redis: RedisConfig;
  mail: MailConfig;
  httpsOptions: HttpsConfig;
}
