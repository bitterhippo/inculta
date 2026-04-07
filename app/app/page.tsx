"use client";

import { SideBar, ExpandableContainer, LongButton } from "@/components";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CampaignCreationDialog } from "@/features/campaignCreation/components";

export default function LoggedInUserPage() {
  const [campaignCreationDialog, campaignCreationDialogToggle] =
    useState<boolean>(false);

  const modalToggleHandler = () => {
    campaignCreationDialogToggle((previousValue: boolean) => {
      return !previousValue;
    });
  };

  useEffect(() => {}, [campaignCreationDialog]);

  return (
    <>
      <SideBar>
        <LongButton
          label="Create New Campaign"
          onClick={() => modalToggleHandler()}
        />
        <ExpandableContainer categoryName="Available Campaigns"></ExpandableContainer>
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
