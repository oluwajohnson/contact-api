const express = require('express');
const { initDb } = require('./data/database');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});