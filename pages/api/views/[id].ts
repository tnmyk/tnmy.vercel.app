import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

type Data = {
  views: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
