import clientPromise from "../lib/mongodb";
import Head from 'next/head'

export default function Users({ users }) {

    const checkInput = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const res = await fetch("/api/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                email: email,
                password: password
            }),
        });
        alert("Logged in")
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

            <button onClick={checkInput}>Login</button>
            



            </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        return {
            props: { isConnected: true }, }; } 
        
            catch (e) {
        console.error(e);
    }
}