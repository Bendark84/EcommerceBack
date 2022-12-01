const { db, DataTypes } = require('../utils/database.util');

/**
 * @openapi
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Benja *
 *         email:
 *           type: string
 *           example: ben@hotmail.com
 *   register:
 *     type: object
 *     properties:
 *      username:
 *        type: string
 *        example: Ben
 *      email:
 *        type: string
 *        example: ben@hotmail.com
 *      password:
 *        type: string
 *        example: 1234
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { User };
