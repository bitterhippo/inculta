import CampaignEditor from "./CampaignEditor";

import { getAssetsByCampaignId } from "@/services/assets";

export default async function CampaignPage({ params }) {
  const data = await getAssetsByCampaignId(params.campaignId);

  return <CampaignEditor initialUserData={data} />;
}
