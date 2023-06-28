require('dotenv').config();
const express = require('express');
const client = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
client.connect(process.env.DB_URI)
.then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
app.use(routes);