import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const LINKS = [
  { href: "/", name: "Testing Google TTS" },
  { href: "/tts", name: "Text-to-speech" },
  { href: "/parse-xml", name: "Parse XML" },
];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 bg-stone-100 ${inter.className}`}
    >
      <h1 className="mb-4 font-bold text-3xl">
        Let's test out Text To Speech!
      </h1>

      <div className="flex gap-1 bg-zinc-200 rounded-full px-2 py-1 mb-8">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-1 rounded-full hover:bg-gray-400 duration-300 ${
              pathname === link.href ? "bg-gray-300" : ""
            }`}
          >
            <div>{link.name}</div>
          </Link>
        ))}
      </div>
      <Component {...pageProps} />
    </main>
  );
}
