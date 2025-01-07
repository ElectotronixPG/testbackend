import express from 'express';
const router = express.Router();
import {
  getShowcases,
  getShowcaseById,
  createShowcase,
  updateShowcase,
  deleteShowcase,
} from '../controllers/showcaseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// Define routes

router.route('/').get(getShowcases).post(protect, admin, createShowcase);
router
  .route('/:id')
  .get(checkObjectId, getShowcaseById)
  .put(protect, admin, checkObjectId, updateShowcase)
  .delete(protect, admin, checkObjectId, deleteShowcase);

export default router;
