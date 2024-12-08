import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, 
});



export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: 'user_profile',
      resource_type: 'auto', 
    });
    return uploadResponse;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message || error);
    throw new Error("Failed to upload media to Cloudinary");
  }
};






export const deleteMediaFromCloudinary = async (publicId) => {
  if (!publicId) {
    console.error("No publicId provided for deletion.");
    return;
  }
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log('Image deleted from Cloudinary');
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error.message || error);
  }
};




export const deleteVideoFromCloudinary = async (publicId) => {
  if (typeof publicId !== "string" || publicId.trim() === "") {
    console.error("Invalid publicId provided for video deletion.");
    return { success: false, message: "Invalid publicId" };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

    if (result.result === "ok") {
      console.log("Video successfully deleted from Cloudinary:", result);
      return { success: true, message: "Video deleted successfully", result };
    } else {
      console.error("Failed to delete video from Cloudinary:", result);
      return { success: false, message: "Deletion failed", result };
    }
  } catch (error) {
    console.error("Error deleting video from Cloudinary:", error.message || error);
    return { success: false, error: error.message || error };
  }
};