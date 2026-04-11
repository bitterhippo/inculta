import CampaignEditor from "./CampaignEditor";

export default async function CampaignPage({ params }) {
  const res = await fetch("http://localhost:3000/api/getAllAssetsById", {
    cache: "no-store",
    // include cookies if needed
  });

  const campaignData = await res.json();

  console.log(campaignData);

  return <CampaignEditor initialUserData={campaignData} />;
}
