import express from 'express';
import {getCartController, postCartController,
     delCartController, patchCartController} 
     from '../controllers';
import {loginRequired} from '../../utils/auth'

const router = express.Router();

router.get('', loginRequired, getCartController);
router.post('', loginRequired, postCartController);
router.delete('', loginRequired, delCartController);
router.patch('', loginRequired, patchCartController);

export default router;