import clientPromise from "../lib/mongodb";
import Head from 'next/head'

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

    const createInput = async () => {
        const emInput = document.getElementById("email").value;
        const psInput = document.getElementById("password").value;
        const res = await fetch("/api/test/add", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                email : emInput,
                password : psInput,
            }),
        });
        const data = await res.json();
        console.log(data);
    };

        
    return (
        <div>
            <Head>
            <title>Login</title>
            <meta property="og:title" content="Login" key="title" />
            </Head>
            <h1>Bedste Users Nogensinde</h1>
            <p>
                <small>(Ifølge Freya Wad Sackett)</small>
            </p>
            
            <p></p>
            <p></p>

            <form>
            <label>
                Email:
                <input type="text" name="email" id="email"/>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" id="password"/>
                </label>
            </form>

            <button onClick={createInput}>Create User With Input</button>
            



            </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const users = await db
            .collection("users")
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