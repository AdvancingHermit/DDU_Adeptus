const cookieParser = require('cookie-parser')

const COOKIE_SECRET = "dasdkfjalsdjfoee23jke"



function sign({  }) {

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


}