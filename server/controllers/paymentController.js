
const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');

// @desc    Create a payment intent with Stripe
// @route   POST /api/payments/create-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd', orderId } = req.body;

  // Validate the order exists and belongs to the user
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to pay for this order');
  }

  // Create a payment intent with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata: { orderId },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id
  });
});

// @desc    Confirm payment success and update order
// @route   POST /api/payments/confirm
// @access  Private
const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  // Verify the payment intent with Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  if (paymentIntent.status !== 'succeeded') {
    res.status(400);
    throw new Error('Payment has not been completed');
  }

  // Find and update the order
  const order = await Order.findById(orderId);
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  // Update order payment details
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: paymentIntentId,
    status: 'completed',
    update_time: new Date().toISOString(),
    email_address: req.user.email
  };
  
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Handle Stripe webhook events
// @route   POST /api/payments/webhook
// @access  Public
const webhookHandler = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Update order if orderId is in metadata
      if (paymentIntent.metadata && paymentIntent.metadata.orderId) {
        const order = await Order.findById(paymentIntent.metadata.orderId);
        
        if (order && !order.isPaid) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: paymentIntent.id,
            status: 'completed',
            update_time: new Date().toISOString(),
            email_address: paymentIntent.receipt_email || ''
          };
          
          await order.save();
        }
      }
      break;
      
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}`);
  }
  
  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = {
  createPaymentIntent,
  confirmPayment,
  webhookHandler
};
