import { useState } from "react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { handleSpeak } from "@/utils/speech";

export default function Home() {
  const [audioTexts, setAudioTexts] = useState<
    {
      audioURL: any;
      text: string;
    }[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSentenceAndSynthesize = () => {
    setIsLoading(true);
    fetch(`/api/sentences?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => handleSpeak(data.sentence))
      .then((data) => {
        setAudioTexts((prev) => [
          ...prev,
          {
            audioURL: data.audioURL,
            text: data.text,
          },
        ]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  };

  const handleClickLoad = () => {
    fetchSentenceAndSynthesize();
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      {audioTexts.map((audioSentence, i) => (
        <div className="flex flex-col items-center my-4" key={i}>
          <p className="mb-2">{audioSentence.text}</p>
          <audio src={audioSentence.audioURL} controls />
        </div>
      ))}

      <Button onClick={handleClickLoad} disabled={isLoading}>
        {isLoading ? <Spinner /> : "Load more content"}
      </Button>
    </>
  );
}
