import connectMongo from '../../utils/connectMongo';
import AssSet from '../../models/assSetModel';

/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function addAssSet(req, res) {
  try{
  const { name, assClass } = req.body;
  console.log("Connecting to MongoDB")
  await connectMongo();
  const assSet = await AssSet.create(req.body);

  res.json({ assSet });

  console.log("Added Assignment Set")
  } catch (err) { 
    console.error(err); 
    res.json({ err });
  }
}