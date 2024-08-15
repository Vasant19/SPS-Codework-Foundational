import { Sequelize } from 'sequelize';

const dbUrl = process.env.DB_URL || '';

// export const sequelize = new Sequelize(dbUrl)

// dwij2003;

export const sequelize = new Sequelize('sps', 'root', 'Meet_9078', {
  host: 'localhost',
  dialect:
    'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully..');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
