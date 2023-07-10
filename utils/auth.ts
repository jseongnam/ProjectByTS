import jwt from 'jsonwebtoken';
import { Response } from 'express';
import {authReq, err} from "../types"
export const loginRequired = async(req : authReq, res : Response, next) => {
    
    try{
        const accessToken : string|null = req.headers.authorization || null;

        if(!accessToken){
            const error : err = new Error('NEED_ACCESS_TOKEN');
            error.statusCode = 401;
            throw error;
        }
        const {userId} : {userId:string} = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = userId;
        next();
    }catch(error){
        if(!error.statusCode){
            error.statusCode = 401;
        }
        res.status(error.statusCode).json({message: "auth에서 오류가 발생했습니다."});
    }
}

