import type { NextApiRequest, NextApiResponse } from "next";

const sentences = [
  "As he dangled from the rope deep inside the crevasse.",
  "He had reached the point where he was paranoid about being paranoid.",
  "Instead of a bachelorette party.",
  "The sunblock was handed to the girl before practice, but the burned skin was proof she did not apply it.",
  "They looked up at the sky and saw a million stars.",
];

type Data = {
  sentence?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const {
      query: { page },
    } = req;

    const parsedPage = page ? Number(page) : 1;
    const outputSentence = sentences[parsedPage % sentences.length];
    res.send({ sentence: outputSentence });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
