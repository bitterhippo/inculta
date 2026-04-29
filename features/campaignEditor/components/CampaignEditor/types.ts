export type PlacedItem = {
  id: string;
  x: number;
  y: number;
  image_url?: string;
};

export type CampaignState = {
  items: PlacedItem[];
  selectedBackground: string | null;
};

export type Action =
  | { type: "addItem"; payload: PlacedItem }
  | { type: "setBackground"; payload: string }
  | { type: "removeItem"; payload: string }
  | { type: "loadCampaign"; payload: CampaignState };
