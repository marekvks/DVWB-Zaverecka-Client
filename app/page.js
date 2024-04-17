'use client'

import { logout } from "./lib/auth";

export default function Home() {

  const handleLogout = async () => {
    const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'DELETE',
        credentials: 'include'
    });
  }

  return (
    <main>
      <p>Main page!1!!</p>
      <button onClick={handleLogout}>LOGOUT</button>
    </main>
  );
}
