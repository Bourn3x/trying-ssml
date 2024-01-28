import { useCallback } from "react";

export default function useSpeechEngine() {
  const handleSpeak = useCallback(async (sentence: string) => {
    const response = await fetch("/api/synthesize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence }),
    });
    const audioBlob = await response.blob();
    const audioURL = URL.createObjectURL(audioBlob);
    return { audioURL, sentence };
  }, []);

  return { handleSpeak };
}
