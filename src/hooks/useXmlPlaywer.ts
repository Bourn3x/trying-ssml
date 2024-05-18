import { useEffect, useState } from "react";
import {
  getXmlTextValuesAux,
  getPrettifiedXmlAux,
  printNodesAuxNew,
} from "@/utils/speech";

export default function useXmlPlaywer() {
  const [isLoading, setIsLoading] = useState(false);
  const [xmlData, setXmlData] = useState<string | null>(null);
  const [xmlDoc, setXmlDoc] = useState<Document>();
  const [prettifiedXml, setPrettifiedXml] = useState<string>();
  const [xmlTextValues, setXmlTextValues] = useState<string>();

  useEffect(() => {
    if (!xmlDoc) return;
    getPrettifiedXml();
  }, [xmlDoc]);

  const getXmlData = async () => {
    setIsLoading(true);
    const response = await fetch("/example1.xml");
    const data = await response.text();
    setXmlData(data);

    const domParser = new DOMParser();
    const xmlDoc = domParser.parseFromString(data, "text/xml");
    setXmlDoc(xmlDoc);

    setIsLoading(false);
  };

  const printNodes = () => {
    if (!xmlDoc) return;
    const output = printNodesAuxNew(xmlDoc.documentElement);
    return output;
  };

  const getPrettifiedXml = () => {
    if (!xmlDoc) return;
    const output = getPrettifiedXmlAux(xmlDoc.documentElement);
    setPrettifiedXml(output);
  };

  const getXmlTextValues = () => {
    if (!xmlDoc) return;
    const output = getXmlTextValuesAux(xmlDoc.documentElement);
    setXmlTextValues(output);
    return output;
  };

  return {
    isLoading,

    getXmlData,
    xmlData,

    printNodes,

    prettifiedXml,

    xmlTextValues,
    getXmlTextValues,
  };
}
