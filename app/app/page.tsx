"use client";

import { useSession } from "next-auth/react";
import { SideBar, ExpandableContainer, LongButton } from "@/components";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CampaignCreationDialog } from "@/features/campaignCreation/components";

export default function LoggedInUserPage() {
  const [campaignData, setCampaignData] = useState([]);
  const [campaignCreationDialog, campaignCreationDialogToggle] =
    useState<boolean>(false);

  const modalToggleHandler = () => {
    campaignCreationDialogToggle((previousValue: boolean) => {
      return !previousValue;
    });
  };

  useEffect(() => {
    async function fetchCampaignData() {
      const response = await fetch("/api/campaigns", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setCampaignData(data);
    }

    fetchCampaignData();
  }, [campaignCreationDialog]);

  console.log(campaignData);

  return (
    <>
      <SideBar>
        <LongButton
          label="Create New Campaign"
          onClick={() => modalToggleHandler()}
        />
        <ExpandableContainer categoryName="Current Campaigns">
          {campaignData?.length < 1 ? (
            <p>Create there are no active campaigns</p>
          ) : (
            <p>you have campaigns</p>
          )}
        </ExpandableContainer>
      </SideBar>
      {campaignCreationDialog &&
        createPortal(
          <CampaignCreationDialog
            onClose={modalToggleHandler}
          ></CampaignCreationDialog>,
          document.body,
        )}
    </>
  );
}
