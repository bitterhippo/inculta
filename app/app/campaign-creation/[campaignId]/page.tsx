import CampaignEditor from "./CampaignEditor";

import { getAssetsByCampaignId } from "@/app/services/assets";

type PageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignPage({ params }: PageProps) {
  const { campaignId } = await params;

  const data = await getAssetsByCampaignId(campaignId);

  return <CampaignEditor initialUserData={data} />;
}
