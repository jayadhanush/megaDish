
const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod
  } = req.body;

  // Check if order has items
  if (items && items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Verify product prices and calculate totals
  let itemsPrice = 0;
  
  // Map order items to include product ID
  const orderItems = await Promise.all(items.map(async (item) => {
    const product = await Product.findById(item.id);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.id}`);
    }
    
    // Verify price matches database
    if (product.price !== item.price) {
      res.status(400);
      throw new Error(`Product price mismatch: ${item.name}`);
    }
    
    itemsPrice += product.price * item.quantity;
    
    return {
      name: item.name,
      quantity: item.quantity,
      image: item.image,
      price: item.price,
      product: item.id
    };
  }));

  // Calculate prices
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice);

  // Create order
  const order = new Order({
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // Find order by ID and populate user's name and email
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  // Check if order exists and belongs to user or is admin
  if (order && (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin)) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
};
