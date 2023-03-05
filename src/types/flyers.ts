export interface IFlyer {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  is_published: boolean;
  retailer: string;
  category: string;
}

export interface IFlyerGetResponse {
  flyers: IFlyer[];
  error?: Error;
}
