import { API_URL } from "@/env";
import { IFlyerGetResponse } from "@/types/flyers";

const API_LIMIT_GET = 10;

export const getFlyers = async ({
  pageParam
}: {
  pageParam?: number;
}): Promise<IFlyerGetResponse> => {
  const res = await fetch(
    `${API_URL}/flyers?page=${pageParam}&limit=${API_LIMIT_GET}`
  );
  return res.json();
};
