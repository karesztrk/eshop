import express from 'express';
import {
  getProudcts,
  getProudctById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getProudcts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id')
  .get(getProudctById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
