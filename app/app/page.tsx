"use client";

import stlyes from "./styles.module.css";
import Link from "next/link";
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

  console.log(campaignData);

  useEffect(() => {
    async function fetchCampaignData() {
      const response = await fetch("/api/campaigns", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const { data } = await response.json();
      setCampaignData(data);
    }

    fetchCampaignData();
  }, [campaignCreationDialog]);

  return (
    <>
      <SideBar>
        <LongButton
          label="Create New Campaign"
          onClick={() => modalToggleHandler()}
        />
        <ExpandableContainer
          categoryName="Current Campaigns"
          placeholder="No active campaigns found"
        >
          <div className={stlyes.twoColumnLayout}>
            {campaignData.length > 0 ? (
              campaignData.map(({ campaign_name }) => {
                console.log(campaign_name);
                return (
                  <p style={{ color: "white" }} key={`campaign_name`}>
                    {campaign_name}
                  </p>
                );
              })
            ) : (
              <>not lol</>
            )}
          </div>
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
