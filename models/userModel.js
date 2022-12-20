import {Schema, model, models} from 'mongoose';
const mongoose =  require('mongoose'); 
const crypto = require('crypto'); 

const userSchema = new Schema({
    class: String,
    firstname: String,
    lastname: String,
    email: String,
    isTeacher: Boolean,
    hash : String, 
    salt : String 

});


userSchema.methods.setPass = function(pass) { 
 
    this.salt = crypto.randomBytes(16).toString('hex'); 

    
    this.hash = crypto.pbkdf2Sync(pass, this.salt,  
    420, 64, `sha512`).toString(`hex`); 
}; 


userSchema.methods.checkPass = function(pass) { 
    var hash = crypto.pbkdf2Sync(pass, this.salt, 420, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 


let User = mongoose.model('User', userSchema); 
export default User;