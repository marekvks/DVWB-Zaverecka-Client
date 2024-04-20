import Navbar from "./components/navbar";

import './css/landing-page.css';

export default function Home() {
  const handleLogout = async () => {
    const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'DELETE',
        credentials: 'include'
    });
  }

  const createBlogpost = async () => {
    const response = await fetch('http://localhost:8080/auth/logout', {
      method: 'GET',
      credentials: 'include'
    });
  }

  return (
    <main>
      <Navbar />
      <section className="landing-section">
        <h3>BlogPost</h3>
      </section>
    </main>
  );
}
