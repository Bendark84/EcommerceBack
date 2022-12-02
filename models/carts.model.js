const { db, DataTypes } = require('../utils/database.util');

/**
 * @openapi
 * components:
 *   schemas:
 *     cart:
 *       type: object
 *       properties:
 *         userId:
 *           tye: integer
 *           axample: 1
 *         totalprice:
 *           type: integer
 *           example: 1000
 *
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const Cart = db.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { Cart };
