import dotenv from 'dotenv';
dotenv.config();

class ConfigError extends Error {
  /**
   *
   * @param {string} field
   * @param {string} envName
   */
  constructor(field, envName) {
    super(`${field} is not provided. please check ${envName} in .env file`);
    this.name = 'ConfigError';
  }
}

const config = {
  port: process.env['PORT'],
};

export default config;
