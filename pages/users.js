import clientPromise from "../lib/mongodb";

export default function Users({ users }) {
    return (
        <div>
            <h1>Bedste Users Nogensinde</h1>
            <p>
                <small>(Ifølge Freya Wad Sackett)</small>
            </p>
            <ul>
                {users.map((user) => (
                    <p>
                        <h2>{user.email}</h2>
                        <p>{user.password}</p>
                    </p>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("ddu_users");

        const users = await db
            .collection("users")
            .find({})
            .sort({ })
            .limit(2)
            .toArray();

        return {
            props: { users: JSON.parse(JSON.stringify(users)) }, }; } 
        
            catch (e) {
        console.error(e);
    }
}