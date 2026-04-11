import { supabase } from "../library/db";

export async function getAssetsByCampaignId(campaign_id: string) {
  const [assetRes, backdropRes] = await Promise.all([
    supabase.from("asset").select("*").eq("campaign_id", campaign_id),
    supabase.from("backdrop").select("*").eq("campaign_id", campaign_id),
  ]);

  if (assetRes.error || backdropRes.error) {
    throw new Error(assetRes.error?.message || backdropRes.error?.message);
  }

  return {
    assetData: assetRes.data,
    backdropData: backdropRes.data,
  };
}
