import {err} from '../types'
import appDataSource from './dataSource'
export const goodsDao = async(goodsDaoByCategoryId : number) => {
    try{
        
        const result = await appDataSource.query(
            `
            SELECT products.id, products.sub_category_id, products.name, products.surface_type_id, products.sell_counts, products.price, products.weight, products.description, products.image_url
            FROM products
            JOIN sub_categories ON products.sub_category_id = sub_categories.id
            JOIN categories ON sub_categories.category_id = categories.id
            WHERE products.sub_category_id = ?
            LIMIT 8;
            `,[goodsDaoByCategoryId]
        );
        if(!result){
            const error : err = new Error('INVALID_NUMBER_INPUT');
            error.statusCode = 400;
            throw error;
        }
        return result;
    }catch(err){
        const error : err = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
};

export const goodsDetailDao = async(goodsName : string) => {
    try{
        const result = await appDataSource.query(
            `
            SELECT *
            FROM products
            WHERE products.name = ?
            `,[goodsName]
        );
        if(!result){
            const error : err = new Error('INVALID_NAME_INPUT');
            error.statusCode = 400;
            throw error;
        }
        return result;
    }catch(err){
        const error : err = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
};
