import { setCookie, getCookie } from 'cookies-next';
import React from "react";


export default function Navbar({ }) {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    const userStatus = () => {
        console.log(getCookie('user'))

        if (getCookie('user') != undefined) {
            const userData = JSON.parse(getCookie('user'))
            console.log(userData)
            let name = userData["firstname"] + " " + userData["lastname"]

            return "Du er logget ind som: " + name
        } else {
            return "Du er ikke logget ind"
        }
    }
    return (
        <>
        {userStatus()}
        </>
    );
  }