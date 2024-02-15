const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.SERVER_HOST || 'http://localhost';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// CORS Policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(port, () => {
  console.log(`Listening at ${host}:${port}`);
});
