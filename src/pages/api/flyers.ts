import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readFlyersFromCsv } from "@/utils/flyers";

import { IFlyerGetResponse } from "@/types/flyers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IFlyerGetResponse>
) {
  let { page, limit } = req.query;
  let pageParsed = parseInt(page as string);
  let limitParsed = parseInt(limit as string);

  // easy filtering of parameters
  if (isNaN(pageParsed) || pageParsed < 1) pageParsed = 1;
  if (isNaN(limitParsed)) limitParsed = 100;

  try {
    // from_line and to_line are 1-indexed cause of the header of the csv
    // (so in our case, we want to start at line 2)
    const result = await readFlyersFromCsv({
      filePath: path.join(process.cwd(), "/src/pages/api/flyers_data.csv"),
      from_line: pageParsed * limitParsed - limitParsed + 2,
      to_line: pageParsed * limitParsed - limitParsed + limitParsed + 1
    });

    // filter out flyers that are not published or expired
    const flyers = result.flyers.filter((flyer) => {
      const endDate = new Date(flyer.end_date);

      if (isNaN(endDate.getTime())) return false;

      return flyer.is_published && endDate.getTime() >= Date.now();
    });

    res.status(200).json({ flyers });
  } catch (err) {
    res.status(500).json({ flyers: [], error: err as Error });
  }
}

