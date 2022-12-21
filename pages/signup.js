import clientPromise from "../lib/mongodb";
import Head from 'next/head'
import Link from "next/link";
var crypto = require('crypto'); 


export default function sign({  }) {

    function setPass(pass) { 
 
        const salt = crypto.randomBytes(16).toString('hex'); 
    
        
        const hash = crypto.pbkdf2Sync(pass, salt,  
        420, 64, `sha512`).toString(`hex`); 
        return [hash, salt]
    }; 

    const createUser = async () => {

        const userClass = document.getElementById("class").value;
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;

        const isTeacher = document.getElementById("isTeacher").checked;
        const hashsalt = setPass(document.getElementById("password").value)
        const hash = hashsalt[0];
        const salt = hashsalt[1];

        const res = await fetch("/api/addUser", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                class : userClass,
                firstname : firstname,
                lastname : lastname,
                email : email,
                isTeacher : isTeacher,
                hash : hash, 
                salt : salt, 
            }),
        });
        alert("User created")





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
            <br/>
            <Link href="/">Tilbage</Link>
            



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