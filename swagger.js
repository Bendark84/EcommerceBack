const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ecommerce back',
      version: '1.0.0',
      description: 'API para el ecommerce',
    },
  },
  apis: ['./routes/user.routes.js', './models/users.model.js'],
};

const swaggerSpec = swaggerJSDoc(options);

//Configuration documentacion

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('ContentType', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(
    `docuemntacion disponible en http://localhost:${port}/api/v1/docs `
  );
};

module.exports = swaggerDocs;
