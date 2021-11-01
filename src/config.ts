import dotenv from 'dotenv';
dotenv.config();

class ConfigError extends Error {
  /**
   *
   * @param {string} field
   * @param {string} envName
   */
  constructor(field: string, envName: string) {
    super(`${field} is not provided. please check ${envName} in .env file`);
    this.name = 'ConfigError';
  }
}

const config = {
  port: process.env['PORT'],
  jwtSecret: process.env['JWT_SECRET']!!,
};

if (!config.jwtSecret) throw new ConfigError('jwtSecret', 'JWT_SECRET');

export default config;
