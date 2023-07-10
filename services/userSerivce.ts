import {PostuserSignUpDao} from '../models/userDao';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import {err} from '../types';

const hashPassword = async(plaintextPassword : string):Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(plaintextPassword, saltRounds);
}
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
const sendEmail = (userEmail) => {
    const mailOptions = {
    from: 'jseongnam1109@gmail.com',
    to: userEmail,
    subject: 'WELCOME TO SJG',
    html: `<div
    style="
        width: 70vw;
        height: 50vh;
        background: #fffef2;
        border: 3px solid #333;
        padding: 1em;
        margin: 2em auto;
    "
    >
    <div
        style="
        border: 2px solid #331;
        width: 70vw;
        height: 49vh;
        "
    >
        <p style="font-size: 30px; text-align:center; padding-top:2em">
        <strong>WELCOME TO SJG TILE!</strong>
        </p>
        <div style="line-height: 10px; text-align: center">
        <div style="margin-bottom: 50px; font-size: 16px; line-height: 15px">
            <p>ENJOY YOUR NEVER-EXPIRING WELCOME GIFT OF</p>
            <u style="font-weight: 800; font-size: 18px">10,000,000 WON</u>
            <p>YOU CAN USE IT AT ANY TIME.</p>
        </div>
        <div style="line-height: 15px">
            <p>SJG타일에 가입하신 것을 환영합니다!!.</p>
            <p>
            유효기간이 없는
            <u style="font-weight: 800; font-size: 18px">10,000,000포인트</u
            >를 지급했습니다.
            </p>
            <p>언제든 사용하세요!</p>
        </div>
        </div>
    </div>
    </div>`,
    };

    try {
    transporter.sendMail(mailOptions);
    } catch (error) {
    throw error;
    }
};

const PostuserSignUpService = async(typeId : number, name, email:string, password : string, account:string):Promise<> => {
    const emailRegex : RegExp= /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const passwordRegex : RegExp= /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/;
    const accountRegex : RegExp = /^[0-9]{10}$/;

    if(typeId === 1){
        if(!emailRegex.test(email)){
            const error : err = new Error('INVALID_USER_EMAIL');
            error.statusCode = 400;
            throw error;
        }
        if(!passwordRegex.test(password)){
            const error : err = new Error('INVALID_USER_PASSWORD');
            error.statusCode = 400;
            throw error;
        }
    }else{
        if((!account)|| (!accountRegex.test(account))){
            const error : err = new Error('INVALID_USER_ACCOUNT');
            error.statusCode = 400;
            throw error;
        }
    }
    const hashedPassword : string = await hashPassword(password);
    const createUser : unknown = await PostuserSignUpDao(
        typeId,
        name,
        email,
        hashedPassword,
        Number(account)
    );
    sendEmail(email);
    return createUser;
}