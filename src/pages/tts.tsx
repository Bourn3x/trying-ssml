import { useRef } from "react";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import useSpeechEngine from "@/hooks/useSpeechEngine";

export default function Home() {
  const { isLoading, isPlaying, handlePlay, handlePause } = useSpeechEngine();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClickPlay = () => {
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;
    handlePlay(inputValue);
  };

  return (
    <>
      <Button
        className="mb-4"
        disabled={isLoading}
        onClick={isPlaying ? handlePause : handleClickPlay}
      >
        {isLoading ? <Spinner /> : isPlaying ? "Pause" : "Play"}
      </Button>

      <textarea
        ref={inputRef}
        defaultValue={`My name is Julian! I am pleased to meet you.

Please feel free to type in any sentence.`}
        style={{ height: "300px" }}
        className="w-full max-w-3xl rounded-md p-4 border-2 focus:outline-none focus:border-blue-200"
        placeholder="Type something!"
      />
    </>
  );
}
