// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import suggestionMockResponse from "./__mocks__/suggestion.json";
import { Suggestion } from "@/declarations/search";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Suggestion>
) {
  res.status(200).json(suggestionMockResponse);
}
