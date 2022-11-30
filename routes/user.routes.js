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
