import {goodsDao, goodsDetailDao} from '../../models/goodsDao'

export const goodsService = async(categoryId : number) => {
    return goodsDao(categoryId);
};

export const goodsDetailService = async(goodsName : string) => {
    return goodsDetailDao(goodsName);
};




