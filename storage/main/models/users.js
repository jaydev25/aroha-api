'use strict';
if (process.env.NODE_ENV === 'development') {
  const bcrypt = require('bcrypt-nodejs');
} else {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
}
const db = require('./index');

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN
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
    timestamps: true,
    hooks: {
      afterCreate: (user, options) => {
        return new Promise ((resolve, reject) => {
          console.log(sequelize.models);
          return sequelize.models[options.data.accType + 's'].create({
            userId: user.id,
            country: options.data.country,
            state: options.data.state,
            city: options.data.city,
            birthDate: options.data.birthDate,
            occupation: options.data.occupation,
            paymentRequestId: options.paymentRequestId,
            createdBy: options.data.email,
            updatedBy: options.data.email
          }, {
            transaction: options.transaction
          }).then(() => {
            return resolve();
          }).catch((error) => {
            console.log(error);
            return reject(error);
          });
        });
      }
    }
  });
  Users.associate = function(models) {
    // associations can be defined hered
    Users.hasOne(models.Pathaks, { foreignKey: 'userId' });
    Users.hasOne(models.Members, { foreignKey: 'userId' });
    Users.hasOne(models.Admins, { foreignKey: 'userId' });
    Users.hasMany(models.Rooms, {foreignKey: 'userId', sourceKey: 'id'});
    Users.hasOne(models.VerificationToken, {
      as: 'verificationtoken',
      foreignKey: 'userId',
      foreignKeyConstraint: true,
    });
  };
  return Users;
};