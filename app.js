const express = require('express');
const morgan = require('morgan'); // Para mirar las respuesyas HTTP
// ! me falta CORS

//Routes
const { usersRoutes } = require('./routes/user.routes');
const { productRoutes } = require('./routes/products.routes');
const { cartsRoutes } = require('./routes/carts.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controllers');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else if (process.env.NODE_ENV === 'production') app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.status(200).json('API Ecommerce');
});
//Endpoints

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartsRoutes);

// Global error handler
app.use(globalErrorHandler);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
