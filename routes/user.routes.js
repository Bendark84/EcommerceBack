const express = require('express');

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkToken,
  getUserProducts,
  getUserOrders,
  getUserOrderById,
} = require('../controllers/users.controllers');

//Middleware
const { userExists } = require('../middlewares/users.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

const {
  createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRoutes = express.Router();

/**
 * @openapi
 * /api/v1/users/signup:
 *   post:
 *     summary: Register a new user into the app
 *     tags: [Users]
 *     requestBody:
 *       description: To register a new user you need a username,email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/register"
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
 *                     $ref: "#/components/schemas/users"
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user into the app
 *     tags: [Users]
 *     requestBody:
 *       description: Login a user you need a username,email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/register"
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
 *                     $ref: "#/components/schemas/users"
 * /api/v1/users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
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

usersRoutes.post('/signup', createUserValidators, createUser);
usersRoutes.post('/login', login); //!revisar si funciona

usersRoutes.use(protectSession);

usersRoutes.get('/', getAllUser);
usersRoutes.get('/me', getUserProducts);
usersRoutes.get('/orders', getUserOrders);
usersRoutes.get('/orders/:id', getUserOrderById);
usersRoutes.get('/check-token', checkToken);
usersRoutes.get('/:id', userExists, getUserById);
usersRoutes.patch('/:id', userExists, updateUser);
usersRoutes.delete('/:id', userExists, deleteUser);

module.exports = { usersRoutes };
