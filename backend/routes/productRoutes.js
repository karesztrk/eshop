import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (request, response) => {
    const products = await Product.find({});
    response.json(products);
  }),
);
router.get(
  '/:id',
  expressAsyncHandler(async (request, response) => {
    const product = await Product.findById(request.params.id);
    if (product) {
      response.json(product);
    } else {
      response.status(404);
      throw new Error('Product not found');
    }
  }),
);

export default router;
