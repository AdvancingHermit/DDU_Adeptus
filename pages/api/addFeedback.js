import connectMongo from '../../utils/connectMongo';
require('../../models/feedbackModel.js');
import Feedback from '../../models/feedbackModel';

/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function addFeedback(req, res) {
  try{
  const { listOfCorr, assSetID } = req.body;
  console.log("Connecting to MongoDB")
  await connectMongo();
  const feedback = await Feedback.create(req.body);

  res.json({ feedback });

  console.log("Added Feedback")
  } catch (err) { 
    console.error(err); 
    console.log(res.json);
    res.json({ err });
  }
}