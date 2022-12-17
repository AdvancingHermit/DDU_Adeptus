import clientPromise from "../lib/mongodb";

export default function Users({ users }) {
    return (
        <div>
            <h1>The Greates Users Of All Time</h1>
            <p>
                <small>(According to Freya Wad Sackett)</small>
            </p>
            <ul>
                {users.map((users) => (
                    <li>
                        <h2>{users._id}</h2>
                        <h3>{users.email}</h3>
                        <p>{users.password}</p>
                    </li>
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
            .limit( )
            .toArray();

        return {
            props: { users: JSON.parse(JSON.stringify(users)) },
        };
    } catch (e) {
        console.error(e);
    }
}