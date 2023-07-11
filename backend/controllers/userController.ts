import {PostuserSignUpService} from '../services/userSerivce'
import { Request, Response } from 'express';
import {err} from '../../types';

export const PostuserSignUpController = async(req : Request,res : Response) => {
    try{
        const {typeId, name, email, password, account} = req.body;

        if(!name||!email||!password){
            const error : err = new Error('KEY_ERROR: Missing required fields: name, email, password.');
            error.statusCode = 400;
            throw error;
        }
        if(typeId !== 1 && ! account){
            const error : err = new Error('KEY_ERROR: Missing required field.');
            error.statusCode = 400;
            throw error;
        }
        await PostuserSignUpService(typeId, name, email, password, account);

        return res.status(201).json({ message : 'SIGNUP_SUCCESS'});
    }catch(error){
        return res.status(error.statusCode||400).json({message : error.message});
    }
};
// export const PostuserSignInController
// export const GetuserOrderDetailController
// export const GetuserUserInformationController