import {Schema, model, models} from 'mongoose';

const assignmentSchema = new Schema({
    assignmentText: String,
    possibleAnswers: String,
    correctAnswer: String,
});


const Assignment = models.Assignment || model('Assignment', assignmentSchema)

export default Assignment;