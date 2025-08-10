const express = require('express') 
const authMiddleware= require('../middleware/auth-middleware')
const isAdminUser= require('../middleware/admin-middleware')
const uploadMiddleware= require('../middleware/upload-middleware')
const {uploadImageController,fetchImageController}= require('../controllers/image-controller')   

const router = express.Router();

router.post(
  '/upload',
  authMiddleware,     // pehle JWT se verify karo
  isAdminUser,        // fir role check karo (sirf admin)
  uploadMiddleware.single('image'),
  uploadImageController
);
router.get('/get', authMiddleware, fetchImageController);
module.exports = router;
