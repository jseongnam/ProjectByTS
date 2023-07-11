import express from 'express';
const router = express.Router();

import goodsRouter from './goodsRouter';
import cartRouter from './cartRouter';
import userRouter from './userRouter';
// import orderRouter from './orderRouter';

router.use('/goods',goodsRouter);
router.use('/carts',cartRouter);
// router.use('/orders',orderRouter);
router.use('/users',userRouter);

export default router;