import { useState } from "react";
import { Dialog, LongButton } from "@/components";
import type { campaignCreationDialogProps } from "./types";
import styles from "./styles.module.css";

export const CampaignCreationDialog = ({
  onClose,
}: campaignCreationDialogProps) => {
  const [campaignNameText, setCampaignNameText] = useState<string>("");

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
            onChange={(e) => setCampaignNameText(e.target.value)}
            placeholder={
              campaignNameText.length < 1
                ? "ENTER CAMPAIGN NAME..."
                : campaignNameText
            }
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
