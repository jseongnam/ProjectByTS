import express from 'express';
import cartController from '../controllers';
import loginRequired from '../utils/auth';

const router = express.Router();

router.get('', loginRequired, cartController.getCarts);
router.post('', loginRequired, cartController.postCarts);
router.delete('', loginRequired, cartController.deleteCarts);
router.patch('', loginRequired, cartController.patchCarts);

export default router;