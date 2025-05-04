
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const { 
  getProducts, 
  getProductById, 
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
  createProductReview,
  getCategories
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', getFeaturedProducts);

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', getProductsByCategory);

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', searchProducts);

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST /api/products/:id/reviews
// @desc    Create product review
// @access  Private
router.post('/:id/reviews', protect, createProductReview);

// @route   GET /api/products/images/:id
// @desc    Get product image from GridFS
// @access  Public
router.get('/images/:id', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, {
      bucketName: 'productImages'
    });

    // Get the file ID
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    
    // Find the file
    const files = await bucket.find({ _id: fileId }).toArray();
    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    // Set content type for the response
    res.set('Content-Type', files[0].contentType);
    
    // Stream the file to the response
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving image'
    });
  }
});

module.exports = router;
