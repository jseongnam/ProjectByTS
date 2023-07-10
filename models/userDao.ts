import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import dataSource from './dataSource';
import {err} from '../types';

export const PostuserSignUpDao = async(typeId : number, name : string, email : string, hashedPassword : string, account : number):Promise<any>=>{
    try{
        const result : Query = await dataSource.query(`INSERT INTO 
            users(
            type_id,
            name,
            email,
            password,
            account,
            point
            ) VALUES (?, ?, ?, ?, ?,1000000);
        `,
    [typeId, name, email, hashedPassword, account]
    );
    return result;
    }catch(error){
        const err : err = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw err;
    }
}