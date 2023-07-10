type authReq = {
    headers : {
        authorization? : string
    };
    user : string;
}
type err = Error & {
    statusCode? : number;
}

type signInRes = {
    typeId? : number;
    name? : string;
    email? : string;
    password? : string;
    account? : string;
}
type cartRes = {
    cartId? : number;
    productId? : number;
    tileName? : string;
    sizeId? : number;
    surfaceTypeId? : number;
    price? : number;
    weight? : number;
    kindId? : number;
}

type orderRes = {

}

export{
    authReq, err
}