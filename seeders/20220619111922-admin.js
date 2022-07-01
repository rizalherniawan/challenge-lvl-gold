'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('users', [
    {
        email: 'admin01@mail.com',
        password: await bcrypt.hash(process.env.ADMIN_PASS, parseInt(process.env.GENSALT)),
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
