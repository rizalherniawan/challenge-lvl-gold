require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "bingle_shop",
    "host": process.env.DB_LOCALHOST,
    "dialect": "postgres"
  }
}
