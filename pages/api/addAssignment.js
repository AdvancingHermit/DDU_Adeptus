import connectMongo from '../../utils/connectMongo';
import Test from '../../models/assignmentModel';

/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function addTest(req, res) {
  try{
  const { assignmentText, possibleAnswers, correctAnswer } = req.body;
  console.log("Connecting to MongoDB")
  await connectMongo();
  const test = await Test.create(req.body);

  res.json({ test });

  console.log("Added Assignment")
  } catch (err) { 
    console.error(err); 
    res.json({ err });
  }
}