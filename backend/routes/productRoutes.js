import express from 'express';
import {
  getProudcts,
  getProudctById,
} from '../controllers/productController.js';

const router = express.Router();
router.route('/').get(getProudcts);
router.route('/:id').get(getProudctById);

export default router;
