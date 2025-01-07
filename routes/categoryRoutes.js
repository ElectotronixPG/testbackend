import express from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategorys,
  getCategoryDetails,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, admin, createCategory)
  .get(protect, admin, getCategorys);
router
  .route('/:id')
  .get(protect, admin, getCategoryDetails)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;
