import express from 'express';
const router = express.Router();
import {
  getProudcts,
  getProudctById,
} from '../controllers/productController.js';

router.route('/').get(getProudcts);
router.route('/:id').get(getProudctById);

export default router;
