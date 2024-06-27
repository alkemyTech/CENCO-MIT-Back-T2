import { Sequelize } from 'sequelize';
import configFile from '../config/config.json';
import User from './models/user.js';

// Initialize Sequelize with the database configuration

const config = configFile.development;
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Create an object to hold all models

const db = {
  User,
  sequelize,
  Sequelize
};

export default db;
