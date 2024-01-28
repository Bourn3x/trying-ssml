// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import TextToSpeech from "@google-cloud/text-to-speech";

type Data =
  | {
      error?: string;
    }
  | string
  | Uint8Array;

const client = new TextToSpeech.TextToSpeechClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { sentence } = req.body;
      const [response] = await client.synthesizeSpeech({
        input: { text: sentence },
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      });
      if (!response.audioContent) throw Error("No audio content");
      const audioBlob = await response.audioContent;
      res.setHeader("Content-Type", "audio/mpeg");
      res.send(audioBlob);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error generating audio" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
