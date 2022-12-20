import clientPromise from "../lib/mongodb";
import Head from 'next/head'
import User from "../models/userModel";
var crypto = require('crypto'); 


export default function sign({  }) {

    const createUser = async () => {


        let newUser = new User();
        newUser.class = document.getElementById("class").value;
        newUser.firstname = document.getElementById("firstname").value;
        newUser.lastname = document.getElementById("lastname").value;
        newUser.email = document.getElementById("email").value;

        newUser.isTeacher = document.getElementById("isTeacher").checked;
        newUser.setPass(document.getElementById("password").value);

        let userjson = newUser.find().lean().exec(function (err, users) {
            return res.end(JSON.stringify(users));
        });

        const res = await fetch("/api/test/addUser", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            }, 
            body : userjson,
            
        });
        const data = await res.json();






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