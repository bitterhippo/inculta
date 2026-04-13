import { nanoid } from "nanoid";

export const buildUploadPayload = (
  type: "assets" | "layers",
  data: {
    campaign_id: string;
    image_url: string;
    label?: string;
  },
) => {
  switch (type) {
    case "assets":
      return {
        id: nanoid(21),
        campaign_id: data.campaign_id,
        image_url: data.image_url,
        createdAt: new Date(),
      };
    case "layers":
      return {
        id: nanoid(21),
        campaign_id: data.campaign_id,
        image_url: data.image_url,
        createdAt: new Date(),
        label: data.label ?? "Test Asset",
      };
  }
};

export const buildUploadPayloadUrl = (
  type: "assets" | "layers" | undefined,
) => {
  switch (type) {
    case "assets":
      return "/api/addAssets";
    case "layers":
      return "/api/addBackdrops";
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};
