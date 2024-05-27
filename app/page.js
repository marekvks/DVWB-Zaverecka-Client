'use client'
import { useEffect } from 'react';

import Navbar from "./components/navbar";
import Image from "next/image";

import './css/landing-page.css';

export default function Home() {
  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: 'DELETE',
        credentials: 'include'
    });
  }

  const createBlogpost = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
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
