'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pathaks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      occupation: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isPaymentVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paymentRequestId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paymentId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedBy: {
        allowNull: false,
        type: Sequelize.STRING
      }
    }).then(() => {
      queryInterface.addConstraint('Pathaks', ['userId'], {
        type: 'unique',
        name: 'Pathaks_unique_userId'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pathaks');
  }
};