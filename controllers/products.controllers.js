//Models
const { Product } = require('../models/products.model');
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllProducts = catchAsync(async (req, res, next) => {
  const product = await Product.findAll({
    where: { status: 'active' },
    include: [
      { model: ProductImg, attributes: ['imgUrl'] },
      { model: User, attributes: ['username', 'email'] },
    ],
  });

  res.status(200).json({
    status: 'success',
    data: { product },
  });
  next();
});

const getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({ product });
});

const createProducts = catchAsync(async (req, res, next) => {
  const { name, price, userId, quantity } = req.body;

  const newProduct = await Product.create({
    name,
    price,
    userId,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    data: { newProduct },
  });
  next();
});

const updateProducts = catchAsync(async (req, res, next) => {
  const { name, price, quantity } = req.body;
  const { product } = req;

  await product.update({ name, price, quantity });

  res.status(200).json({
    status: 'success',
    data: { product },
  });
  next();
});

const deleteProducts = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
  next();
});

module.exports = {
  getAllProducts,
  getProductById,
  createProducts,
  updateProducts,
  deleteProducts,
};
