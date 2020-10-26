import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProudcts = expressAsyncHandler(async (request, response) => {
  const products = await Product.find({});
  response.json(products);
});

const getProudctById = expressAsyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    response.json(product);
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

const deleteProduct = expressAsyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    await product.remove();
    response.json({ message: 'Product removed' });
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = expressAsyncHandler(async (request, response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: request.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  const createProduct = await product.save();
  response.status(201).json(createProduct);
});

const updateProduct = expressAsyncHandler(async (request, response) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = request.body;
  const product = await Product.findById(request.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    response.json(updatedProduct);
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

const createProductReview = expressAsyncHandler(async (request, response) => {
  const { rating, comment } = request.body;
  const product = await Product.findById(request.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === request.user._id.toString(),
    );
    if (alreadyReviewed) {
      response.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: request.user.name,
      rating: Number(rating),
      comment,
      user: request.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    response.status(201).json({ message: 'Review added' });
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProudcts,
  getProudctById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
