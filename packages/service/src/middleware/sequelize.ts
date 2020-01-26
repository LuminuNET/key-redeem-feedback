import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.info('Connection succeeded');
  })
  .catch((err: Error) => {
    console.error(`Connection failed: ${err}`);
  });

export { sequelize };
