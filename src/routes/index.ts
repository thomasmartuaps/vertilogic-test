import { Router } from 'express';
import Vendor from '../controllers/Vendor';

const router = Router();

// endpoints for Vendor
router.post('/vendor', Vendor.create);
router.get('/vendor');
router.get('/vendor/id');
router.put('/vendor');
router.delete('/vendor');

// endpoints for Dish
router.post('/dish');
router.put('/dish');
router.delete('/dish');

// endpoints for Order

export default router;