import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';
import { server } from 'http';
const crypto = require('crypto'); 
const cookieParser = require('cookie-parser')
import { setCookie } from 'cookies-next';

const COOKIE_SECRET = "dasdkfjalsdjfoee23jke"
const COOKIE_OPTIONS = {
    httpOnly: true,
    //secure: !dev,
    signed: true
}
/*
export const getServerSideToken = req => {
    const { signedCookies = {} } = req
    if (!signedCookies){
        return {}
    } else if (!signedCookies.token){
        return {}
    }
    return {}
}
*/


export default async function handler(req,res){



    await connectMongo();
    const {email,password} =req.body
    //const userthing = await User.create(req.body);


    const tmpuser = await User.findOne({email})
    if(!tmpuser){
        console.log("fail bozo")
        return res.json({status:'Not able to find the user'})
    }
    const hash = crypto.pbkdf2Sync(password, tmpuser.salt, 420, 64, `sha512`).toString(`hex`);

    const user = await User.findOne({email, hash})

    if(!user){
        console.log("fail bozo")
        return res.json({status:'Not able to find the user'})
    }
    else{
        const userData = {
            userClass: user.class,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            teacher: user.isTeacher,
        }
        console.log(userData)
        console.log("Succes")
        res.json({ userData });
    }
}