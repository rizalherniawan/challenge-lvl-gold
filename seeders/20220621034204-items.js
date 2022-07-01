'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('items', [
      {
        name: "IPHONE 6",
        category: "Elektronik",
        price: 2000000,
        stocks: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "SAMSUNG S6",
        category: "Elektronik",
        price: 1000000,
        stocks: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dada ayam 100 gr",
        category: "Makanan",
        price: 20000,
        stocks: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "RC Honda Civic",
        category: "Mainan",
        price: 200000,
        stocks: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('items', null, {})
  }
};
