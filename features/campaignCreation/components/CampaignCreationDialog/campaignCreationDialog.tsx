import { useState } from "react";
import { Dialog, LongButton } from "@/components";
import type { campaignCreationDialogProps } from "./types";

export const CampaignCreationDialog = ({
  onClose,
}: campaignCreationDialogProps) => {
  return (
    <Dialog onClose={onClose}>
      <div>
        <span>LOL</span>
      </div>
      {/* TODO: Inputs */}
      <div></div>
      <div>
        <LongButton
          label="Create"
          onClick={() => console.log("create campaign")}
        />
        <LongButton label="Cancel" onClick={() => console.log("onClose")} />
      </div>
    </Dialog>
  );
};
