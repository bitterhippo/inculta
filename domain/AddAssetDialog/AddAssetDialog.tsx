"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Dialog, FileUploadIconButton, Button } from "@/components";
import { uploadToCloudinary } from "@/app/services/cloudinaryUpload";
import { AddAssetDialogTypes } from "./types";
import styles from "./styles.module.css";

export const AddAssetDialog = ({
  selectedFile,
  setDialogOpen,
  setSelectedFile,
}: AddAssetDialogTypes) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDialogClose = useCallback(() => {
    setSelectedFile(null);
    setDialogOpen(false);
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    if (!previewUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      canvas.width = 128;
      canvas.height = 128;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      //TODO: research if this the appropriate "white band" by which to turn pixels translucent
      const threshold = 240;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r >= threshold && g >= threshold && b >= threshold) {
          data[i + 3] = 0; // make pixel transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  }, [previewUrl]);

  return (
    <Dialog onClose={handleDialogClose}>
      <div className={styles.AddAssetDialogWrapper}>
        <div className={styles.AddAssetDialogInnerWrapper}>
          <div className={styles.AddAssetDialogFileUploadWrapper}>
            <FileUploadIconButton onFileSelect={setSelectedFile} />
            <span className={styles.AddAssetDialogText}>
              {selectedFile
                ? selectedFile?.name
                : "Currently no file selected."}
            </span>
          </div>
          <div className={styles.AddAssetDialogImageContainer}>
            {previewUrl ? (
              <canvas ref={canvasRef} className={styles.AddAssetDialogImg} />
            ) : (
              <span className={styles.AddAssetDialogPreviewText}>
                No preview available - file not selected
              </span>
            )}
          </div>
          <div className={styles.AddAssetDialogButtonRow}>
            <Button
              isDisabled={previewUrl ? false : true}
              label="Create"
              //TODO: this obviously needs to best tested + broken out into a separate handler
              onClick={async () => {
                // setUploading(true);
                await canvasRef.current?.toBlob(async (blob) => {
                  if (!blob) return;
                  const file = new File([blob], "sticker.png", {
                    type: "image/png",
                  });
                  const url = await uploadToCloudinary(file);

                  //TODO: remove the console.log from here
                  console.log("Uploaded URL:", url);
                  handleDialogClose();
                });
                // setUploading(false);
              }}
            />
            <Button label="Cancel" onClick={handleDialogClose} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};
