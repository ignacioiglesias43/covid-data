export interface MainData {
  State?: { [key: string]: State };
  country?: string;
  sourceUrl?: string;
  README?: string;
  historyData?: string;
  infected?: number;
  negative?: number;
  suspected?: number;
  deceased?: number;
  tested?: string;
  recovered?: string;
  lastUpdatedAtApify?: string;
  lastUpdatedAtSource?: string;
}

export interface State {
  infected: number;
  deceased: number;
}
