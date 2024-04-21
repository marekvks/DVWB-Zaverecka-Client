import Navbar from "./components/navbar";
import Image from "next/image";

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
        <div className="text-container">
          <h3 className="title">BlogPost</h3>
          <p className="description">Short description about this blogpost</p>
        </div>
        <div className="image-container">
          <Image src="/raccoon-dance.gif" alt="404" width="300" height="300" />
        </div>
      </section>
      <span className="horizontal-line"></span>
    </main>
  );
}
