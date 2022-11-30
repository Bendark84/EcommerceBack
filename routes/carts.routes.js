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

// cartsRoutes.use(protectSession);

cartsRoutes.get('/', getUserCart);
cartsRoutes.post('/add-product', addProductToCart);
cartsRoutes.post('/purchase', purchaseCart);
cartsRoutes.patch('/update-cart', updateProductInCart);
cartsRoutes.delete('/:productId', removeProductFromCart);

module.exports = { cartsRoutes };
