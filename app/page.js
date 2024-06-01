import Navbar from "./components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col items-center w-full">
        <section className="flex flex-row justify-between w-7/12 mt-44">
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold">BlogPost</h3>
            <p className="text-xl text-greyText mt-2">Závěrečná práce DVWB SSPS/Cajthaml</p>
          </div>
          <div className="image-container">
            <Image src="/raccoon-dance.gif" unoptimized alt="404" width="300" height="300" className="rounded-full border-2 border-solid border-greenBright" />
          </div>
        </section>
        <section className="flex flex-row justify-center mt-44">
          <Link href="/blogPostFeed" className="px-16 py-4 text-2xl border border-solid border-greenBright rounded-full transition-all hover:bg-greenDark">Feed</Link>
        </section>
      </section>
    </main>
  );
}