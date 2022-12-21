import connectMongo from '../../utils/connectMongo';
require('../../models/singleModel.js');
import Single from '../../models/singleModel';

/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function addSingle(req, res) {
  try{
  const { assignmentText, correctAnswer, assSetID } = req.body;
  console.log("Connecting to MongoDB")
  await connectMongo();
  const single = await Single.create(req.body);

  res.json({ single });

  console.log("Added Single")
  } catch (err) { 
    console.error(err); 
    console.log(res.json);
    res.json({ err });
  }
}