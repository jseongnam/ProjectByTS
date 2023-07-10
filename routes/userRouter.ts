import express from 'express';
import {PostuserSignUpController,PostuserSignInController,GetuserOrderDetailController,GetuserUserInformationController} from '../controllers';
import {loginRequired} from '../utils/auth';

const router = express.Router();

router.get('', loginRequired, PostuserSignUpController);
router.post('', loginRequired, PostuserSignInController);
router.delete('', loginRequired, GetuserOrderDetailController);
router.patch('', loginRequired, GetuserUserInformationController);

export default router;