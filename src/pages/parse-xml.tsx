import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import useXmlPlayer from "@/hooks/useXmlPlaywer";

export default function Page() {
  const {
    isLoading,

    getXmlData,
    xmlData,

    prettifiedXml,
    getPrettifiedXml,

    xmlTextValues,
    getXmlTextValues,
  } = useXmlPlayer();

  console.log(prettifiedXml);

  return (
    <>
      <Button disabled={isLoading} onClick={getXmlData}>
        {isLoading ? <Spinner /> : "Load content"}
      </Button>
      <div className="flex mb-4 gap-4">
        <Button onClick={getPrettifiedXml}>Prettify Tree</Button>
        <Button onClick={getXmlTextValues}>Get Text Values</Button>
      </div>

      <div className="grid grid-cols-2 [&>*]:p-4 border border-gray-400">
        <div
          className={`col-span-2 border-gray-400 ${xmlData ? "border-b" : ""}`}
        >
          {xmlData ? <div>{xmlData}</div> : "Click load content to load data"}
        </div>
        {xmlData && (
          <>
            <pre className="border-r border-gray-400 whitespace-pre-line whitespace-pre-wrap">
              {prettifiedXml}
            </pre>
            <div className="">{xmlTextValues}</div>
          </>
        )}
      </div>
    </>
  );
}
