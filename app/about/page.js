import Navbar from "@/components/navbar";
import Link from "next/link";

export default function About() {
    return (
      <main>
        <Navbar />
        <section className="flex flex-col items-center">
          <section className="flex flex-col w-1/4 items-center gap-16 mt-16">
            <h1 className="text-3xl font-bold">About us</h1>
            <div className="flex flex-row justify-between w-full">
              <Link href="https://github.com/marekvks/DVWB-Zaverecka-Server" className="px-8 py-2 border border-solid border-greenBright rounded-full transition-all hover:bg-greenDark">Server source code</Link>
              <Link href="https://github.com/marekvks/DVWB-Zaverecka-Client" className="px-8 py-2 border border-solid border-greenBright rounded-full transition-all hover:bg-greenDark">Client source code</Link>
            </div>
          </section>
        </section>
      </main>
    );
  }