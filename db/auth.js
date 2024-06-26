import { dbConnection } from './connection.js';

export const auth = async () => {  
  try {
    await dbConnection().authenticate();
    await dbConnection().sync();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};