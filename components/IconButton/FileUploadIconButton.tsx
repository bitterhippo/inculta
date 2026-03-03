import { IconButtonTypes } from "./types";
import { Upload } from "react-feather";
import styles from "./styles.module.css";

export const FileUploadIconButton = ({ onClick }: IconButtonTypes) => {
  return (
    <button onClick={onClick} className={styles.IconButton}>
      <div className={styles.IconButtonContentWrapper}>
        <Upload size={"16px"} />
        <span className={styles.IconButtonText}>Click to Upload</span>
      </div>
    </button>
  );
};
