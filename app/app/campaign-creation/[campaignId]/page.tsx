import CampaignEditor from "./CampaignEditor";

import { getAssetsByCampaignId } from "@/app/services/assets";

export default async function CampaignPage({ params }) {
  const { campaignId } = await params;

  const data = await getAssetsByCampaignId(campaignId);

  return <CampaignEditor initialUserData={data} />;
}
