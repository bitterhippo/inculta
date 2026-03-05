"use client";

import { useState, useEffect } from "react";
import { Dialog, FileUploadIconButton } from "@/components";
import { AddAssetDialogTypes } from "./types";
import styles from "./styles.module.css";

export const AddAssetDialog = ({
  selectedFile,
  setDialogOpen,
  setSelectedFile,
}: AddAssetDialogTypes) => {
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  return (
    <Dialog onClose={() => setDialogOpen(false)}>
      <div className={styles.AddAssetDialogInnerWrappper}>
        <div className={styles.AddAssetDialogFileUploadWrapper}>
          <FileUploadIconButton onFileSelect={setSelectedFile} />
          <span className={styles.AddAssetDialogText}>
            {selectedFile ? selectedFile?.name : "Currently no file selected."}
          </span>
        </div>
        <div className={styles.AddAssetDialogImageContainer}>
          {previewUrl ? (
            <div>
              <img
                src={previewUrl}
                alt={selectedFile?.name}
                className={styles.AddAssetDialogImg}
              />
            </div>
          ) : (
            <div> No preview available - file not selected</div>
          )}
        </div>
      </div>
    </Dialog>
  );
};
