import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';
const crypto = require('crypto'); 


export default async function handler(req,res){

    await connectMongo();
    const {email,password} =req.body
    //const userthing = await User.create(req.body);


    const tmpsalt = await User.findOne({email}.salt)
    const hash = crypto.pbkdf2Sync(password, tmpsalt, 420, 64, `sha512`).toString(`hex`);

    const user = await User.findOne({email, hash})

    if(!user){
        return res.json({status:'Not able to find the user'})
    }
    else{
        res.redirect('/home')
    }
}