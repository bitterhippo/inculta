import { nanoid } from "nanoid";

export const buildUploadPayload = (
  type: "asset" | "backdrop",
  data: {
    userId: string;
    campaignId: string;
    imageUrl: string;
    label?: string;
  },
) => {
  switch (type) {
    case "asset":
      return {
        id: nanoid(21),
        userId: data.userId,
        campaignId: data.campaignId,
        imageUrl: data.imageUrl,
        createdAt: new Date(),
      };
    case "backdrop":
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
  type: "asset" | "backdrop" | undefined,
) => {
  switch (type) {
    case "asset":
      return "/api/addAssets";
    case "backdrop":
      return "/api/addBackdrops";
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};
