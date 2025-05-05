const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  getUsers, 
  getUserById,
  updateUser,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  uploadProductImage
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File upload destination:", file);
    console.log("File destination:", path.join(__dirname, '../uploads'));
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('image');

// User routes (admin only)
router.get('/users', protect, admin, getUsers);
router.get('/users/:id', protect, admin, getUserById);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

// Product routes (admin only)
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

// Order routes (admin only)
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);

// Upload route for product images
router.post('/upload', protect, admin, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      // Log and send error response if something goes wrong
      console.error("File upload error:", err);
      return res.status(400).json({ message: err.message });
    }
    // If the file is uploaded successfully, call the next handler
    uploadProductImage(req, res);
  });
});

module.exports = router;
