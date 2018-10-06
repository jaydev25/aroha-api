'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rooms = sequelize.define('Rooms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    rules: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    time: {
      type: DataTypes.DATE
    },
    entryFee: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    roomId: {
      type: DataTypes.INTEGER
    },
    roomPassword: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      default: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING
    },
    updatedBy: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: true
  });
  Rooms.associate = function(models) {
    // associations can be defined here
    Rooms.belongsTo(models.Users, {foreignKey: 'userId', targetKey: 'id'});
    Rooms.hasMany(models.RoomUsers, {foreignKey: 'roomId', targetKey: 'id'});
  };
  return Rooms;
};