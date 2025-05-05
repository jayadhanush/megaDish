const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { GridFSBucket } = require('mongodb');

// USER CONTROLLERS (ADMIN)

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// PRODUCT CONTROLLERS (ADMIN)

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, countInStock, featured } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    category,
    description,
    countInStock,
    featured: featured || false,
    
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
    featured
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.featured = featured !== undefined ? featured : product.featured;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ success: true, message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// ORDER CONTROLLERS (ADMIN)

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = req.body.isDelivered || order.isDelivered;
    
    if (req.body.isDelivered && !order.deliveredAt) {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Upload product image
// @route   POST /api/admin/upload
// @access  Private/Admin
const uploadProductImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  try {
    // Option 1: Store image in MongoDB using GridFS
    console.log("hh");
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, {
      bucketName: 'productImages'
    });
    console.log(req.file.path);
    // Read the file from disk
    const fileStream = fs.createReadStream(req.file.path);
    
    // Create upload stream to MongoDB
    const uploadStream = bucket.openUploadStream(req.file.filename, {
      contentType: req.file.mimetype
    });
    
    // Store file ID for retrieval
    const fileId = uploadStream.id;
    
    // Pipe the file to MongoDB
    fileStream.pipe(uploadStream);
    
    // Handle completion
    uploadStream.on('finish', () => {
      // Remove the temporary file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error removing temporary file:', err);
      });
      
      // Return the URL for accessing this image
      const imageUrl = `/api/products/images/${fileId}`;
      res.status(201).json({
        success: true,
        imageUrl
      });
    });
    
    // Handle errors
    uploadStream.on('error', (error) => {
      console.error('Error uploading to GridFS:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload image to database'
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500);
    throw new Error('Failed to upload image');
  }
});

module.exports = {
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
};
