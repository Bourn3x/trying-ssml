import { useState } from "react";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import useXmlPlayer from "@/hooks/useXmlPlaywer";
import useSpeechEngine from "@/hooks/useSpeechEngine";

export default function Page() {
  const [isDisplayPretty, setisDisplayPretty] = useState(false);
  const {
    isLoading,

    getXmlData,
    xmlData,

    prettifiedXml,

    xmlTextValues,
    getXmlTextValues,
  } = useXmlPlayer();

  const {
    isLoading: isLoadingAudio,
    isPlaying,
    handleClickPlayPause,
  } = useSpeechEngine();

  const handleClickPlayPauseButton = () => {
    if (!xmlTextValues) return;
    handleClickPlayPause(xmlTextValues);
  };

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={getXmlData}
        className="bg-violet-400 hover:bg-violet-500"
      >
        {isLoading ? <Spinner /> : "Load content"}
      </Button>
      <div className="flex mb-4 gap-4">
        <Button
          onClick={() => setisDisplayPretty((prev) => !prev)}
          disabled={!xmlData}
        >
          {isDisplayPretty ? "Show Original" : "Prettify Tree"}
        </Button>
        <Button onClick={getXmlTextValues} disabled={!xmlData}>
          Get Text Values
        </Button>
      </div>

      <div className="[&>*]:p-4 border border-gray-400 w-full max-w-3xl">
        <div className={`border-gray-400 ${xmlData ? "border-b" : ""}`}>
          {xmlData ? (
            <>
              {isDisplayPretty ? (
                <pre className="text-sm whitespace-pre-line whitespace-pre-wrap">
                  {prettifiedXml}
                </pre>
              ) : (
                <pre className="text-sm">{xmlData}</pre>
              )}
            </>
          ) : (
            <p className="text-gray-500 italic">
              Click load content to load data..
            </p>
          )}
        </div>

        {xmlTextValues && (
          <>
            <div className="border-b border-gray-400">
              <p>{xmlTextValues}</p>
              <Button onClick={handleClickPlayPauseButton}>
                {isLoadingAudio ? <Spinner /> : isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
