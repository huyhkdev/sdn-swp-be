import multer from "multer";

export const multerUpload = multer({ dest: 'uploads/' });