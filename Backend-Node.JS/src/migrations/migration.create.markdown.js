'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Markdown', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contentMarkdown: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      contentHTML: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      specialityId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      introduction: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Markdown');
  }
};