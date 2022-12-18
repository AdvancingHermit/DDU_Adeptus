import clientPromise from "../lib/mongodb";


export default function Users({ users }) {
    const createUser = async () => {
        const randomNum = Math.floor(Math.random() * 1000);
        const res = await fetch("/api/test/add", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            }, 
            body : JSON.stringify({
                email : "test" + randomNum + "@test.com",
                password : "Test" + randomNum,
            }),
            
        });
        const data = await res.json();
        console.log(data);
    };
        
    return (
        <div>
            <h1>Bedste Users Nogensinde</h1>
            <p>
                <small>(Ifølge Freya Wad Sackett)</small>
            </p>
            <ul>
                {users.map((user) => (
                    <li>
                        <h2>{user.email}</h2>
                        <h3>{user.password}</h3>
                    </li>
                ))}
            </ul>
            <button onClick={createUser}>Create User</button>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const users = await db
            .collection("tests")
            .find({})
            .sort({ })
            .limit(20)
            .toArray();

        return {
            props: { users: JSON.parse(JSON.stringify(users)) }, }; } 
        
            catch (e) {
        console.error(e);
    }
}