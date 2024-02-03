import { useState } from "react";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import useSpeechEngine from "@/hooks/useSpeechEngine";

export default function Home() {
  const { isLoading, isPlaying, handlePlay, handlePause } = useSpeechEngine();

  const [inputText, setInputText] =
    useState(`My name is Julian! I am pleased to meet you.

Please feel free to type in any sentence.`);

  const handleClickPlay = async () => {
    handlePlay(inputText);
  };

  const handleClickPause = async () => {
    handlePause();
  };

  return (
    <>
      <Button
        className="mb-4"
        disabled={inputText.length === 0 || isLoading}
        onClick={isPlaying ? handleClickPause : handleClickPlay}
      >
        {isLoading ? <Spinner /> : isPlaying ? "Pause" : "Play"}
      </Button>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ height: "300px" }}
        className="w-full max-w-3xl rounded-md p-4 border-2 focus:outline-none focus:border-blue-200"
        placeholder="Type something!"
      />
    </>
  );
}
