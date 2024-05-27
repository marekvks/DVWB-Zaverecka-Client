'use client';

import { useEffect, useState } from 'react';
import { getAccessToken } from '../lib/auth';
import Cookies from 'js-cookie';

export default function UserData() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        (async () => {
            const accessToken = await getAccessToken(Cookies);

            const response = await fetch('http://localhost:8080/user/@me', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            setUserData(data);
        })();
    }, []);

    function MakeEditable(elementId) {
        const element = document.getElementById(elementId);
        element.contentEditable = "true";
        element.focus();
    }

    async function saveAll() {
        const updatedData = {
            firstName: document.getElementById('name').textContent,
            username: document.getElementById('username').textContent
        };
    
        const response = await fetch('http://localhost:8080/user/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get("accessToken")}`
            },
            body: JSON.stringify(updatedData)
        });
    
        if (response.ok) {
            console.log("User updated successfully.");
        } else {
            console.error("Failed to update user.");
        }
    }
    return (
        <main>
            <div>
                Jmenuji se: <p id='name'>{userData.firstName}</p>
                <button id="nameBtn" onClick={() => MakeEditable('name')}>Edit Text</button>
            </div>
            <br/>
            <div>
                Ale říkej mi: <p id='username'>{userData.username}</p>
                <button id="usernameBtn" onClick={() => MakeEditable('username')}>Edit Text</button>
            </div>
            <br/>
            <p id='mail'>Kontaktuj mě tady: {userData.email}</p>
            <br/>
            <p id='password'>Kdybys chtěl moje heslo: {userData.password}</p>
            <br/>
            <p id='role'>Tady v aplikaci jsem {userData.role}!!!</p>
            <br/>
            <button id='saveBtn' onClick={() => saveAll()}>save</button>
        </main>
    );
}
