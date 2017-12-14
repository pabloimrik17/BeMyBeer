//http://knexjs.org/#Schema
// https://alexzywiak.github.io/running-migrations-with-knex/index.html

// Update with your config settings.

require('dotenv').config();

module.exports = {

  development: {
      client: 'mysql2',
      connection: {
          host : process.env.DATABASE_HOST_IP,
          user : process.env.DATABASE_USER,
          password : process.env.DATABASE_PASS,
          database : process.env.TEST_DATABASE_NAME,
          charset : process.env.DATABASE_CHARSET,
      }
  },

  production: {
      client: 'mysql2',
      connection: {
          host : process.env.DATABASE_HOST_IP,
          user : process.env.DATABASE_USER,
          password : process.env.DATABASE_PASS,
          database : process.env.TEST_DATABASE_NAME,
          charset : process.env.DATABASE_CHARSET,
      }
  }
};
