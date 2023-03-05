import { IFlyer } from "@/types/flyers";
import { parse } from "csv";
import fs from "fs";

interface ICsvResult {
  flyers: IFlyer[];
}

/**
 *
 * @param object with file path, delimiter (default set to ';'), from_line and to_line (optional)
 * @returns a promise that resolves to an object with an array of flyers
 */
export const readFlyersFromCsv = ({
  filePath,
  delimiter = ";",
  from_line,
  to_line
}: {
  filePath: string;
  delimiter?: string;
  from_line?: number;
  to_line?: number;
}): Promise<ICsvResult> => {
  return new Promise((resolve, reject) => {
    const flyers: IFlyer[] = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          delimiter,
          from_line,
          to_line,
          columns: [
            "id",
            "title",
            "start_date",
            "end_date",
            "is_published",
            "retailer",
            "category"
          ]
        })
      )
      .on("data", (row) =>
        flyers.push({
          ...row,
          is_published: row.is_published === "1" ? true : false
        })
      )
      .on("end", () => resolve({ flyers }))
      .on("error", (error) => reject(error));
  });
};
