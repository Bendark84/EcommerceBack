//Models
const { User } = require('./users.model');
const { Order } = require('./orders.model');
const { Product } = require('./products.model');
const { Cart } = require('./carts.model');
const { ProductImg } = require('./productsImgs.model');
const { ProductInCart } = require('./productsInCart.model');
const { ProductInOrder } = require('./productsInOrder.model');

const initModels = () => {
  // 1 User <------> M Products
  User.hasMany(Product, { foreignKey: 'userId' });
  Product.belongsTo(User);
  //1 User <-------> 1 Cart
  User.hasOne(Cart, { foreignKey: 'userId' });
  Cart.belongsTo(User);
  // 1 User <------> M Order
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User);

  //1 Cart <-------> M Products in Cart
  Cart.hasMany(ProductInCart, { foreignKey: 'cartId' });
  ProductInCart.belongsTo(Cart);

  // 1 Product <------> M Imgs
  Product.hasMany(ProductImg, { foreignKey: 'productId' });
  ProductImg.belongsTo(Product);

  // 1 Order <--------> M ProductInOrder
  Order.hasMany(ProductInOrder, { foreignKey: 'orderId' });
  ProductInOrder.belongsTo(Order);
  // 1 Product <--------> M ProductInOrder
  Product.hasMany(ProductInOrder, { foreignKey: 'productId' });
  ProductInOrder.belongsTo(Product);

  // 1 Product <------> M Imgs
  Product.hasOne(ProductInCart, { foreignKey: 'productId' });
  ProductInCart.belongsTo(Product);
};

module.exports = { initModels };
