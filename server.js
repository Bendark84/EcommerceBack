const { app } = require('./app');
const { db } = require('./utils/database.util');

const { initModels } = require('./models/initModels');

const startServer = async () => {
  try {
    await db.authenticate();

    initModels();

    await db.sync();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log('Express app running!', PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
