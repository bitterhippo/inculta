"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Dialog, FileUploadIconButton, Button, LongButton } from "@/components";
import { uploadToCloudinary } from "@/app/services/cloudinaryUpload";
import { AddAssetDialogTypes } from "./types";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import { buildUploadPayload, buildUploadPayloadUrl } from "./utils";

export const AddAssetDialog = ({
  campaign_id,
  selectedFile,
  setDialogOpen,
  setSelectedFile,
  source,
}: AddAssetDialogTypes) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [uploading, setUploading] = useState<boolean>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDialogClose = useCallback(() => {
    setSelectedFile(null);
    setDialogOpen(false);
  }, []);

  const getTitle = (source: string) =>
    source === "assets" ? "Create New Asset" : "Create New Backdrop";

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
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
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
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Dialog onClose={handleDialogClose}>
      <div className={styles.AddAssetDialogWrapper}>
        <div className={styles.AddAssetDialogInnerWrapper}>
          <h2 className={styles.AddAsetDialogTitleText}>{getTitle(source)}</h2>
          <div className={styles.AddAssetDialogImageContainer}>
            {previewUrl ? (
              <canvas ref={canvasRef} className={styles.AddAssetDialogImg} />
            ) : (
              <div className={styles.AddAssetDialogFileUploadWrapper}>
                <div className={styles.AddAssetDialogText}>
                  {selectedFile ? (
                    selectedFile?.name
                  ) : (
                    <p>Currently no file selected</p>
                  )}
                </div>
                <FileUploadIconButton
                  text="Select Source"
                  onFileSelect={setSelectedFile}
                />
              </div>
            )}
          </div>
          <div className={styles.AddAssetDialogButtonRow}>
            <LongButton
              isDisabled={previewUrl || uploading ? false : true}
              label="Upload Asset"
              onClick={async () => {
                setUploading(true);
                await canvasRef.current?.toBlob(async (blob) => {
                  if (!blob) return;
                  const uniqueFileName = `sticker_${Date.now()}_${nanoid(11)}.png`;
                  const file = new File([blob], `${uniqueFileName}`, {
                    type: "image/png",
                  });
                  const url = await uploadToCloudinary(file);

                  if (!source) {
                    throw new Error("source is required here");
                  }

                  const payloadUrl = buildUploadPayloadUrl(source);

                  const payload = buildUploadPayload(source, {
                    campaign_id,
                    image_url: url,
                  });
                  const response = await fetch(payloadUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    credentials: "include",
                  });

                  const data = await response.json();
                  handleDialogClose();
                });
                setUploading(false);
              }}
            />
            <LongButton label="Abort" onClick={handleDialogClose} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};
