import { Router } from 'express';
import Vendor from './Vendor';
import Tag from './Tag';
import VendorTags from './VendorTags';
import Dish from './Dish';
import Order from './Order';

const router = Router();

// endpoints
router.use('/vendor', Vendor);
router.use('/tag', Tag);
router.use('/vendortags', VendorTags);
router.use('/dish', Dish);
router.use('/order', Order);

export default router;