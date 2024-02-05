import { useState } from "react";
import { Howl } from "howler";
import { generateAudioFiles } from "@/utils/speech";
import { SpeechMarks } from "@/types/speech";

export default function useSpeechEngine() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState<string>();
  const [generatedAudio, setGeneratedAudio] = useState<{
    howl: Howl;
    speechMarks: SpeechMarks;
  }>();

  const handleClickPlayPause = (inputText: string) => {
    if (isPlaying) handlePause();
    else handlePlay(inputText);
  };

  const handlePlay = async (inputText: string) => {
    if (text === inputText) {
      setIsPlaying(true);
      generatedAudio?.howl.play();
      return;
    }

    setIsLoading(true);
    setText(inputText);
    const { data } = await generateAudioFiles(inputText);
    const sound = new Howl({
      src: [`data:audio/ogg;base64,${data.audioStream}`],
      format: ["ogg"],
      html5: true, // Force to HTML5 so that it works on most browsers
    });
    setGeneratedAudio({ howl: sound, speechMarks: data.speechMarks });
    sound.play();
    setIsPlaying(true);
    setIsLoading(false);
  };

  const handlePause = () => {
    if (!generatedAudio) return;
    generatedAudio.howl.pause();
    setIsPlaying(false);
  };

  return {
    isLoading,
    isPlaying,
    handlePlay,
    handlePause,
    handleClickPlayPause,
  };
}
