import { nanoid } from "nanoid";

export const buildUploadPayload = (
  type: "assets" | "layers",
  data: {
    userId: string;
    campaignId: string;
    imageUrl: string;
    label?: string;
  },
) => {
  switch (type) {
    case "assets":
      return {
        id: nanoid(21),
        userId: data.userId,
        campaignId: data.campaignId,
        imageUrl: data.imageUrl,
        createdAt: new Date(),
      };
    case "layers":
      return {
        id: nanoid(21),
        userId: data.userId,
        campaignId: data.campaignId,
        imageUrl: data.imageUrl,
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
