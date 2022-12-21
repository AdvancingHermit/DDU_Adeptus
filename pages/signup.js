import clientPromise from "../lib/mongodb";
import Head from 'next/head'
//import User from "../models/userModel";
var crypto = require('crypto'); 


export default function sign({  }) {

    const createUser = async () => {


        //let newUser = new User();
        const userClass = document.getElementById("class").value;
        const firstname = document.getElementById("firstname").value;

        const res = await fetch("/api/addUser", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                class : userClass,
                firstname : firstname,
            }),
        });
        const data = await res.json();
        console.log(data);





    }
    return (
        <div>
        <Head>
            <title>Signup</title>
            <meta property="og:title" content="Sign Up" key="title" />
        </Head>
            <h1>Bedste Signup-side Nogensinde</h1>
            <p>
                <small>(Ifølge Freya Wad Sackett)</small>
            </p>
            
            <p></p>
            <p></p>

            <form>
                <label>
                    Klasse:
                <input type="text" name="class" id="class"/>
                </label>
                <br/>
                <label>
                    Fornavn:
                <input type="text" name="firstname" id="firstname"/>
                </label>
                <br/>
                <label>
                    Efternavn:
                    <input type="text" name="lastname" id="lastname"/>
                </label>
                <br/>
                <label>
                    Email:
                    <input type="text" name="email" id="email"/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="text" name="password" id="password"/>
                </label>
                <br/>
                <label>
                    Er du lærer?
                    <input type="checkbox" id="isTeacher" name="isTeacher"/>
                </label>
            </form>

            <button onClick={createUser}>Create User With Input</button>
            



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