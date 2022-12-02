const express = require('express');
const { body, validationResult } = require('express-validator');

const {
  getUserCart,
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
} = require('../controllers/orders.controllers');

//Middleware
// const { cartExists } = require('../middlewares/carts.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

// const {
//   createUserValidators,
// } = require('../middlewares/validators.middlewares');

const cartsRoutes = express.Router();

/**
 * @openapi
 * /api/v1/cart:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add products to cart
 *     tags: [Cart]
 *     requestBody:
 *       description: Add products to cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/cart"
 *     responses:
 *       201:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/cart"
 * /api/v1/cart/purchase:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: buy a products by User
 *     tags: [Cart]
 *     requestBody:
 *       description: Add products to cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/cart"
 *     responses:
 *       201:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/cart"
 * 
 * /api/v1/cart/get:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get Use rCart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user Id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 * /api/v1/cart/update-cart:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: changes a product by User
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user Id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 * /api/v1/cart/delete/{productId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a product by User
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user Id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 
 */

// cartsRoutes.use(protectSession);

cartsRoutes.get('/', getUserCart);
cartsRoutes.post('/add-product', addProductToCart);
cartsRoutes.post('/purchase', purchaseCart);
cartsRoutes.patch('/update-cart', updateProductInCart);
cartsRoutes.delete('/:productId', removeProductFromCart);

module.exports = { cartsRoutes };
