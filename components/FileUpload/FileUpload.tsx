import styles from "./styles.module.css";

export const FileUpload = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
  };

  return (
    <div className={styles.FileUploadWrapper}>
      <input
        className={styles.FileUploadInput}
        type="file"
        accept="image"
        onChange={handleChange}
      />
      <div className={styles.FileUploadText}>lol</div>
    </div>
  );
};
