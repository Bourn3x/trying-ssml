import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import useSpeechEngine from "@/hooks/useSpeechEngine";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { handleSpeak } = useSpeechEngine();
  const [audioSentences, setAudioSentences] = useState<
    {
      audioURL: any;
      sentence: string;
    }[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/sentences?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.sentence) throw Error("no sentence found");
        return handleSpeak(data.sentence);
      })
      .then((data) => {
        setAudioSentences((prev) => [
          ...prev,
          {
            audioURL: data.audioURL,
            sentence: data.sentence,
          },
        ]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [currentPage, handleSpeak]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      {audioSentences.map((audioSentence, i) => (
        <div className="flex flex-col items-center my-4" key={i}>
          <p className="mb-2">{audioSentence.sentence}</p>
          <audio src={audioSentence.audioURL} controls />
        </div>
      ))}

      <button
        className="py-2 px-8 rounded-full font-semibold mt-4 bg-blue-400 disabled:opacity-30"
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={isLoading}
      >
        Load more content
      </button>
    </main>
  );
}
