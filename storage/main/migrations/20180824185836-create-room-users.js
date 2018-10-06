'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RoomUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Users', key: 'id' }
      },
      roomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Rooms', key: 'id' }
      },
      attendance: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      kills: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rank: {
        type: Sequelize.INTEGER
      },
      payment: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      paymentVerified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paymentRequestId: {
        allowNull: false,
        type: Sequelize.STRING
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RoomUsers');
  }
};