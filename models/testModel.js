import {Schema, model, models} from 'mongoose';

const testSchema = new Schema({
    email: String,
    password: String
});


const Test = models.Test || model('Test', testSchema)

export default Test;