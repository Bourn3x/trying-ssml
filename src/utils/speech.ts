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

const INDENT_SPACING = "  ";

type Output = {
  outputString: string;
  audioNodes: number;
};

export const printNodesAux = (node: Node, indent: string = ""): Output => {
  let output: Output = {
    outputString: "",
    audioNodes: 0,
  };

  if (node.nodeName === "audio") {
    output["audioNodes"] += 1;
  }

  if (node instanceof Element) {
    if (node.attributes.length > 0) {
      console.log(`${indent}<${node.nodeName}`);
      // Print attributes
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        console.log(
          `${indent}${INDENT_SPACING}@${attribute.name}="${attribute.value}"`
        );
      }
      console.log(`${indent}>`);
    } else {
      console.log(`${indent}<${node.nodeName}>`);
    }

    // Print child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];

      if (childNode instanceof Element) {
        // Element node
        const childOutput = printNodesAux(
          childNode,
          `${indent}${INDENT_SPACING}`
        );
        output["audioNodes"] += childOutput["audioNodes"];
        output["outputString"] += childOutput["outputString"];
      } else if (
        childNode instanceof Text &&
        childNode.nodeValue?.trim() !== ""
      ) {
        // Text node with content
        console.log(`${indent}${INDENT_SPACING}${childNode.nodeValue?.trim()}`);
      }
    }
  }
  console.log(`${indent}</${node.nodeName}>`);
  return output;
};

const addString = (output: Output, string: string) => {
  const newOutput = Object.assign({}, output);
  newOutput["outputString"] += string;
  return newOutput;
};

export const printNodesAuxNew = (node: Node, indent: string = ""): Output => {
  let output: Output = {
    outputString: "",
    audioNodes: 0,
  };

  if (node.nodeName === "audio") {
    output["audioNodes"] += 1;
  }

  if (node instanceof Element) {
    if (node.attributes.length > 0) {
      output = addString(output, `${indent}<${node.nodeName}\n`);
      // Print attributes
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        output = addString(
          output,
          `${indent}${INDENT_SPACING}@${attribute.name}="${attribute.value}"\n`
        );
      }
      output = addString(output, `${indent}>\n`);
    } else {
      output = addString(output, `${indent}<${node.nodeName}>\n`);
    }

    // Print child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];

      if (childNode instanceof Element) {
        // Element node
        const childOutput = printNodesAuxNew(
          childNode,
          `${indent}${INDENT_SPACING}`
        );
        output["audioNodes"] += childOutput["audioNodes"];
        output["outputString"] += childOutput["outputString"];
      } else if (
        childNode instanceof Text &&
        childNode.nodeValue?.trim() !== ""
      ) {
        // Text node with content
        output = addString(
          output,
          `${indent}${INDENT_SPACING}${childNode.nodeValue?.trim()}\n`
        );
      }
    }
  }

  output = addString(output, `${indent}</${node.nodeName}>\n`);
  console.log("output", output);
  return output;
};

export const getPrettifiedXmlAux = (
  node: Node,
  indent: string = ""
): string => {
  let output = "";

  if (node instanceof Element) {
    if (node.attributes.length > 0) {
      output += `${indent}<${node.nodeName}\n`;
      // Print attributes
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        const isLast = i === node.attributes.length - 1;
        output += `${indent}${INDENT_SPACING}@${
          attribute.name
        }="${attribute.value.replaceAll(/\s+/g, " ")}"${isLast ? "" : "\n"}`;
      }
      output += `${indent}>\n`;
    } else {
      output += `${indent}<${node.nodeName}>\n`;
    }

    // Print child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];

      if (childNode instanceof Element) {
        // Element node
        output += getPrettifiedXmlAux(childNode, `${indent}${INDENT_SPACING}`);
      } else if (
        childNode instanceof Text &&
        childNode.nodeValue?.trim() !== ""
      ) {
        // Text node with content
        output += `${indent}${INDENT_SPACING}${childNode.nodeValue?.trim()}\n`;
      }
    }
  }

  output += `${indent}</${node.nodeName}>\n`;
  return output;
};

export const getXmlTextValuesAuxOld = (node: Node): string => {
  let output = "";

  if (node instanceof Element) {
    // Print child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];

      if (childNode instanceof Element) {
        // Element node
        output += getXmlTextValuesAux(childNode);
      } else if (
        childNode instanceof Text &&
        childNode.nodeValue?.trim() !== ""
      ) {
        // Text node with content
        output += `${childNode.nodeValue?.trim()} `;
      }
    }
  }

  return output;
};

export const getXmlTextValuesAux = (node: Node) => {
  let output = "";

  if (node.nodeName === "audio") return output;

  if (node instanceof Element) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      const { nodeType, nodeValue } = childNode;

      if (nodeType === Node.ELEMENT_NODE) {
        output += getXmlTextValuesAux(childNode);
      } else if (nodeType === Node.TEXT_NODE) {
        const trimmedValue = nodeValue?.trim();
        switch (trimmedValue) {
          case ".":
            break;
          default:
            output += ` ${nodeValue?.trim()}`;
        }
      }
    }
  }

  return output;
};
