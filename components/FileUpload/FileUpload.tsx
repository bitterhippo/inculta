export const FileUpload = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
  };

  return (
    <div>
      <input type="file" accept="image" onChange={handleChange} />
    </div>
  );
};
