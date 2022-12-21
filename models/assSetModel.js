import {Schema, model, models} from 'mongoose';

const assSetSchema = new Schema({
    name: String,
    assClass: String,
});


const AssSet = models.AssSet || model('assSet', assSetSchema)

export default AssSet;