'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function UserData() {

    const [userData, setUserData] = useState({})
    const AccesToken = Cookies.get("accessToken");
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8080/user/getUser', {
                headers: {
                    "Authorization": `Bearer ${AccesToken}`
                }

            })
            const data = await response.json()
            setUserData(data)
        })()
    }, [])
  return (
    <main>
        Jmenuji se {userData.firstName}
        <br/>
        Ale říkej mi {userData.username}
        <br/>
        Kontaktuj mě tady: {userData.email}
        <br/>
        Kdybys chtěl moje heslo: {userData.password}
        <br/>
        Tady v aplikaci jsem {userData.role}!!!
    </main>
  );
}
