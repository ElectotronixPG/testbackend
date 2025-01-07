import express from 'express';
const router = express.Router();
import {
  getServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getServices).post(protect, admin, createService);
router
  .route('/:id')
  .get(checkObjectId, getServiceById)
  .put(protect, admin, checkObjectId, updateService)
  .delete(protect, admin, checkObjectId, deleteService);

export default router;
