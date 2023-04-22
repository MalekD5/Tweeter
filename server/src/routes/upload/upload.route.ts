import express from 'express';
import multer from 'multer';
import path from 'path';

import UploadController from '@/controllers/upload/upload.controller';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './images');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2097152, // 2MB
    files: 1,
    fields: 0
  },
  fileFilter: async (_req, file, cb) => {
    const fileTypes = /jpg|png|jpeg/;
    const ext = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && ext) {
      cb(null, true);
    } else {
      cb(new Error('image needs to be png, jpeg, or jgp'));
    }
  }
});

router.post('/', upload.single('img'), UploadController);

export default router;
