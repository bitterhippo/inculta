"use client";

import { Dialog, FileUploadIconButton } from "@/components";
import { AddAssetDialogTypes } from "./types";
import styles from "./styles.module.css";

export const AddAssetDialog = ({
  selectedFile,
  setDialogOpen,
  setSelectedFile,
}: AddAssetDialogTypes) => {
  return (
    <Dialog onClose={() => setDialogOpen(false)}>
      <FileUploadIconButton onFileSelect={setSelectedFile} />
      <span className={styles.AddAssetDialogText}>
        {selectedFile ? selectedFile?.name : "Currently no file selected."}
      </span>
    </Dialog>
  );
};
