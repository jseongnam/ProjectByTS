import {goodsService, goodsDetailService} from '../services/goodsService'
import { Request, Response } from 'express';
// import {err} from '../types';
export const getGoodsController = async(req : Request,res :Response) => {
    try{
        const data : number = Number(req.params.goodsId);
        const returnData = await goodsService(data);

        return await res.status(200).json({data: returnData});
    }catch(error){
        return await res.status(401).json({message : "getGoodsController 에서 오류가 발생했습니다."});
    }
}
export const getGoodsNameController = async(req : Request, res : Response) => {
    try{
        const goodsName : string = req.params.goodsName;
        const returnData = await goodsDetailService(goodsName);

        return await res.status(200).json({data : returnData});
    }catch(error){
        return await res.status(401).json({message : "getGoodsNameController 에서 오류가 발생했습니다."});
    }
};


