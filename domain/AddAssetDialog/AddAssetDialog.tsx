"use client";

import { Dialog, FileUploadIconButton } from "@/components";
import { AddAssetDialogTypes } from "./types";

export const AddAssetDialog = ({
  selectedFile,
  setDialogOpen,
  setSelectedFile,
}: AddAssetDialogTypes) => {
  return (
    <Dialog onClose={() => setDialogOpen(false)}>
      <FileUploadIconButton onFileSelect={setSelectedFile} />
      {selectedFile && <div>{selectedFile?.name}</div>}
    </Dialog>
  );
};
