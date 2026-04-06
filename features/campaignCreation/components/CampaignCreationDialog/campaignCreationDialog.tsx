import { useState } from "react";
import { Dialog, LongButton } from "@/components";
import type { campaignCreationDialogProps } from "./types";
import styles from "./styles.module.css";

export const CampaignCreationDialog = ({
  onClose,
}: campaignCreationDialogProps) => {
  return (
    <Dialog onClose={onClose}>
      <div className={styles.CampaignCreationDialogOuterWrapper}>
        <div className={styles.CampaignCreationTextContainer}>
          <span className={styles.CampaignCreationText}>
            Initiate New Campaign
          </span>
        </div>
        {/* TODO: Inputs */}
        <div className={styles.CampaignCreationInputContainer}>
          <p className={styles.CampaignCreationInputLabel}>
            CRUSADE DESIGNATION
          </p>
          <input
            className={styles.CampaignCreationInput}
            placeholder="Enter Campaign Name"
          ></input>
        </div>
        <div className={styles.CampaignCreationSizeSelectorContainer}></div>
        <div className={styles.CampaignCreationDialogActionButtonRow}>
          <LongButton
            label="Create"
            onClick={() => console.log("create campaign")}
          />
          <LongButton label="Cancel" onClick={() => console.log("onClose")} />
        </div>
      </div>
    </Dialog>
  );
};
