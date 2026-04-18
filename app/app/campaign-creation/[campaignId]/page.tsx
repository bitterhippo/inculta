import CampaignEditor from "@/features/campaignEditor/components/CampaignEditor/CampaignEditor";
import { getAssetsByCampaignId } from "@/app/services/assets";

import type { PageProps } from "./types";

export default async function CampaignPage({ params }: PageProps) {
  const { campaignId } = await params;

  const data = await getAssetsByCampaignId(campaignId);

  return <CampaignEditor initialUserData={data} campaign_id={campaignId} />;
}
