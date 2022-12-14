const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' },
  });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
  next();
});
const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  //Encrypt password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  //Remove pass from responce
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser },
  });
  next();
});

const updateUser = catchAsync(async (req, res, next) => {
  const { username } = req.body;
  const { user } = req;

  await user.update({ username });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
  next();
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
  next();
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Wrong credentials', 400));
  }

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
    algorithm: 'HS512',
  });

  res.status(200).json({
    status: 'success',
    data: { user, token },
  });
  next();
});
const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

const getUserProducts = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const getUserOrders = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const getUserOrderById = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

module.exports = {
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
};
