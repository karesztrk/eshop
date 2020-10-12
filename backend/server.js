import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.get('/', (request, response) => {
  response.send('API is running...');
});

//app.use(notFound);

//app.use(errorHandler);

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(`Server started in ${ENV} on port ${PORT}`.yellow.bold),
);
