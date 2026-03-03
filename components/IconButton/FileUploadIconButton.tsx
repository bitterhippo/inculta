import { FileUploadIconButtonTypes } from "./types";
import { Upload } from "react-feather";
import { useRef } from "react";
import styles from "./styles.module.css";

export const FileUploadIconButton = ({
  onFileSelect,
}: FileUploadIconButtonTypes) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // triggers the file picker
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };
  return (
    <>
      <button onClick={handleClick} className={styles.IconButton}>
        <div className={styles.IconButtonContentWrapper}>
          <Upload size={"16px"} />
          <span className={styles.IconButtonText}>Click to Upload</span>
        </div>
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className={styles.FileUploadInput}
        onChange={handleChange}
      />
    </>
  );
};
