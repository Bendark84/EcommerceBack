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

productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', productExists, getProductById);

// productRoutes.use(protectSession);

productRoutes.post('/', createProducts);
productRoutes.patch('/:id', productExists, updateProducts);
productRoutes.delete('/:id', productExists, deleteProducts);

module.exports = { productRoutes };
