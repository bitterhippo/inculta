import CampaignEditor from "./CampaignEditor";

import { getAssetsByCampaignId } from "@/app/services/assets";

export default async function CampaignPage({ params }) {
  const data = await getAssetsByCampaignId(params.campaignId);

  console.log(data);

  return <CampaignEditor initialUserData={data} />;
}
