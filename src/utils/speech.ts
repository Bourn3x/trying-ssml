import { GenerateAudioAPI } from "@/types/speech";

export const handleSpeak = async (text: string) => {
  const response = await fetch("/api/synthesize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const audioBlob = await response.blob();
  const audioURL = URL.createObjectURL(audioBlob);
  return { audioURL, text };
};

export const generateAudioFiles = async (text: string) => {
  const response = await fetch(
    "https://audio.api.speechify.com/generateAudioFiles",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audioFormat: "ogg",
        paragraphChunks: [text],
        voiceParams: {
          engine: "azure",
          languageCode: "en-US",
          name: "Jenny",
        },
      }),
    }
  );
  const data: GenerateAudioAPI = await response.json();
  return { data };
};
