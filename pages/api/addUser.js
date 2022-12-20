import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function addUser(req, res) {
  try{
  const { email, password } = req.body;
  console.log("Connecting to MongoDB")
  await connectMongo();
  const user = await User.create(req.body);

  res.json({ user });

  console.log("Added User")
  } catch (err) { 
    console.error(err); 
    res.json({ err });
  }
}