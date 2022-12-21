import {Schema, model, models} from 'mongoose';

const singleSchema = new Schema({
    assignmentText: String,
    correctAnswer: String,
    assSetID: String,
});


const Single = models.Single || model('Single', singleSchema)

export default Single;