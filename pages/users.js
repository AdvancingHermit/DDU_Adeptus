import clientPromise from "../lib/mongodb";
import { setCookie, getCookie } from 'cookies-next';

export default function Users({ users }) {
    console.log(getCookie('user'))
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

//Her er en knap der opretter en bruger med random email og password
//<button onClick={createUser}>Create User</button>
        
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