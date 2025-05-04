
const express = require('express');
const router = express.Router();
const { 
  createPaymentIntent, 
  confirmPayment, 
  webhookHandler 
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Create a payment intent with Stripe
router.post('/create-intent', protect, createPaymentIntent);

// Confirm payment success
router.post('/confirm', protect, confirmPayment);

// Stripe webhook handler - raw body needed for signature verification
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

module.exports = router;
