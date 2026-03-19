const express = require('express');
const { initDb } = require('./data/database');
const contactsRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});