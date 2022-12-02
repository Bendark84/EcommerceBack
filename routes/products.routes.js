const express = require('express');

const {
  getAllProducts,
  getProductById,
  createProducts,
  updateProducts,
  deleteProducts,
} = require('../controllers/products.controllers');

//Middleware
const { productExists } = require('../middlewares/products.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

// const {
//   createUserValidators,
// } = require('../middlewares/validators.middlewares');

const productRoutes = express.Router();

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create a products
 *     tags: [Products]
 *     requestBody:
 *       description: Create a new Product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/product"
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
 *                     $ref: "#/components/schemas/product"
 * 
 * /api/v1/products/{id}:
 *   get:
 *     
 *     summary: Get product by User
 *     tags: [Products]
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
 * /api/v1/products/update/{id}:
 *   patch:
 *     
 *     summary: Delete a product by User
 *     tags: [Products]
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
 * /api/v1/products/delete/{id}:
 *   delete:
 *     
 *     summary: Delete a product by User
 *     tags: [Products]
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

productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', productExists, getProductById);

// productRoutes.use(protectSession);

productRoutes.post('/', createProducts);
productRoutes.patch('/:id', productExists, updateProducts);
productRoutes.delete('/:id', productExists, deleteProducts);

module.exports = { productRoutes };
