import { setCookie, getCookie } from 'cookies-next';
import React from "react";
import Image from 'next/image'
import Link from 'next/link';


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
            <header style={{maxHeight: 1639 / 6 }} id="header">

                <a href="/">
                    <Image
                        src="/logo.png"
                        alt="Adeptus logo"
                        width={1639 / 6}
                        height={679 / 6}
                    />
                </a>
                <div id="userStatus">
                    {userStatus()}
                </div>
            </header>
        </>
    );
  }