import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import Cors from "cors";

type Data = {
  views: number;
};

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    const { id: pageId }: any = req.query;
    const notion = new Client({ auth: process.env.NOTION_KEY });

    const initresponse: any = await notion.pages.retrieve({ page_id: pageId });

    await notion.pages.update({
      page_id: pageId,
      properties: {
        Views: {
          number: initresponse.properties.Views.number + 1,
        },
      },
    });
    res.status(200).json({ views: initresponse.properties.Views.number + 1 });
  }
}
