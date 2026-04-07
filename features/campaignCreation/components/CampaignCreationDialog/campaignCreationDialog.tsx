import { useState } from "react";
import { Dialog, LongButton, SelectableImageContainer } from "@/components";
import type { campaignCreationDialogProps } from "./types";
import styles from "./styles.module.css";

export const CampaignCreationDialog = ({
  onClose,
}: campaignCreationDialogProps) => {
  const [campaignNameText, setCampaignNameText] = useState<string>("");
  const [selectedCampaignType, setSelectedCampaignType] =
    useState<string>("sm");

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
          <label className={styles.CampaignCreationInputLabel}>
            CRUSADE DESIGNATION
          </label>
          <input
            className={styles.CampaignCreationInput}
            onChange={(e) => setCampaignNameText(e.target.value)}
            placeholder={"ENTER CAMPAIGN NAME..."}
            value={campaignNameText}
          />
        </div>
        <div className={styles.CampaignCreationSizeSelectorWrapper}>
          <label className={styles.CampaignCreationInputLabel}>
            CANVAS SIZE - SMALL TO LARGE
          </label>
          <div className={styles.CampaignCreationSizeSelectorContainer}>
            <SelectableImageContainer
              onClick={() => setSelectedCampaignType("sm")}
              isSelected={selectedCampaignType === "sm"}
              imgProps={{
                src: `https://res.cloudinary.com/dpwjuknc3/image/upload/v1774665994/jsurva9f65fqmna8e8br.png`,
              }}
            />
            <SelectableImageContainer
              onClick={() => setSelectedCampaignType("md")}
              isSelected={selectedCampaignType === "md"}
              imgProps={{
                src: `https://res.cloudinary.com/dpwjuknc3/image/upload/v1774665994/jsurva9f65fqmna8e8br.png`,
              }}
            />
            <SelectableImageContainer
              onClick={() => setSelectedCampaignType("lg")}
              isSelected={selectedCampaignType === "lg"}
              imgProps={{
                src: `https://res.cloudinary.com/dpwjuknc3/image/upload/v1774665994/jsurva9f65fqmna8e8br.png`,
              }}
            />
          </div>
        </div>
        <div className={styles.CampaignCreationDialogActionButtonRow}>
          <LongButton
            label="Create"
            onClick={() => console.log("create campaign")}
          />
          <LongButton label="Cancel" onClick={onClose} />
        </div>
      </div>
    </Dialog>
  );
};
