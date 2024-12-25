// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import queryResultMockResponse from "./__mocks__/queryResult.json";
import { ListResponse } from "@/declarations/api";
import { ResultItem } from "@/declarations/search";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse<ResultItem>>
) {
  res.status(200).json(queryResultMockResponse);
}
