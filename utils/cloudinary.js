import cloudinary from 'cloudinary';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname);  
    },
});

const upload = multer({ storage });
export const uploadToCloudinary = (files) => {
    return new Promise((resolve, reject) => {
      // Create an array of promises to upload each file
      const uploadPromises = files.map((file) => {
        const fileType = file.mimetype.split('/')[0];  // Get the file type (video or pdf)
        
        // Check if the file type is valid (video or pdf)
        if (fileType === 'video' || file.mimetype === 'application/pdf') {
          // Return the upload promise for this file
          return cloudinary.uploader.upload(file.path, { resource_type: fileType })
            .then(result => result.url)  // Return the Cloudinary URL
            .catch(error => {
              throw new Error(`Failed to upload ${file.originalname}: ${error.message}`);
            });
        } else {
          // Reject if the file type is invalid
          throw new Error('Invalid file type. Only PDF and MP4 are allowed.');
        }
      });
  
      // Wait for all file uploads to complete
      Promise.all(uploadPromises)
        .then(urls => resolve(urls))  // Return all file URLs once they are uploaded
        .catch(error => reject(error));  // Reject if any upload fails
    });
  };
  

export const cloudinaryUploadMiddleware = upload.array('files', 10);
