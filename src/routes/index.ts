import { Router } from 'express';
import Vendor from './Vendor';
import Tag from './Tag';
import VendorTags from './VendorTags';
import Dish from './Dish';

const router = Router();

// endpoints
router.use('/vendor', Vendor);
router.use('/tag', Tag);
router.use('/vendortags', VendorTags);
router.use('/dish', Dish);

//

// endpoints for Order
router.post('/order');
router.put('/order/:id');
router.delete('/order/:id');

export default router;