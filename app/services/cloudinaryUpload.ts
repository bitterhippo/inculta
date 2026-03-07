import axios from "axios";

export const uploadToCloudinary = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "inculta_preset");

  const response = await axios.post(url, formData);
  return response.data.secure_url;
};
