import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (request, response) => {
  response.send('API is running...');
});
app.get('/api/products', (request, response) => {
  response.json(products);
});
app.get('/api/products/:id', (request, response) => {
  const product = products.find((p) => p._id === request.params.id);
  response.json(product);
});

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.listen(PORT, () => console.log(`Server started in ${ENV} on port ${PORT}`));
