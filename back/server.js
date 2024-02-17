const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.SERVER_HOST || 'http://localhost';
const helloWorldRouter = require('./src/application/routes/helloWorld')();

// CORS Policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Routes
app.get('/', helloWorldRouter);

app.listen(port, () => {
  console.log(`Listening at ${host}:${port}`);
});
