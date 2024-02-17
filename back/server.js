const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.SERVER_HOST || 'http://localhost';
const helloWorldRouter = require('./src/application/routes/helloWorld')();
const cardsRouter = require('./src/application/routes/cards')();
const errorMiddleware = require('./src/application/middlewares/errorMiddleware');
const { createContainer, asClass, asValue, Lifetime } = require('awilix');

// Dependency Injection
const container = createContainer();
container.register({
  cardService: asClass(require('./src/domain/services/CardService').CardService),
  storageConnector: asClass(require('./src/application/connectors/storageConnector')).singleton(),
});
app.use((req, res, next) => {
  req.container = container.createScope();
  next();
});

// CORS Policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Routes
app.use('/', helloWorldRouter);
app.use('/cards', cardsRouter);

app.use(errorMiddleware);

console.log('NODE_ENV:', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening at ${host}:${port}`);
  });
}

module.exports = app;
