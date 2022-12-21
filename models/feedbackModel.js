import {Schema, model, models} from 'mongoose';

const feedbackSchema = new Schema({
    listOfCorr: String,
    assSetID: String,
});


const Feedback = models.Feedback || model('feedback', feedbackSchema)

export default Feedback;