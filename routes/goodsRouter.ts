import express from 'express';
import {getGoodsController,getGoodsNameController} from '../controllers';

const router = express.Router();
router.get('/category/:goodsId', getGoodsController);
router.get('/name/:goodsName', getGoodsNameController);

export default router;