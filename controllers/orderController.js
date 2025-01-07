import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, billingAddress, paymentResult } =
    req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    const order = new Order({
      user: req.user._id,
      orderItems: dbOrderItems,
      shippingAddress,
      billingAddress,
      paymentResult,
      itemsPrice,
      shippingPrice,
      totalPrice,
      createdAt: Date.now(), // Add createdAt here
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
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

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order transfer paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderTranserPaid = asyncHandler(async (req, res) => {
  try {
    // Verify the payment from PayPal
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) {
      console.error(
        `Payment verification failed for Order ID: ${req.params.id}`
      );
      throw new Error('Payment not verified');
    }

    // Check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) {
      console.error(
        `Duplicate transaction detected for Order ID: ${req.params.id}`
      );
      throw new Error('Transaction has been used before');
    }

    // Find the order by ID
    const order = await Order.findById(req.params.id);

    if (order) {
      // Check if the correct amount was paid
      const paidCorrectAmount = order.totalPrice.toString() === value;
      if (!paidCorrectAmount) {
        console.error(
          `Incorrect payment amount: Expected ${order.totalPrice}, received ${value}`
        );
        throw new Error('Incorrect amount paid');
      }

      // Update the order as paid
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        paymentComfirmID: req.body.paymentComfirmID,
        transferedName: req.body.transferedName,
        transferedAmount: req.body.transferedAmount,
        transferedDate: req.body.transferedDate,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      // Save the updated order
      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (err) {
    console.error('Error during payment update:', err);
    res.status(500).json({ message: err.message });
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const { transferedNumber } = req.body; // Destructure transferedNumber from request body
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.transferedNumber = transferedNumber; // Save the transferedNumber in the order

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderTranserPaid,
  updateOrderToDelivered,
  getOrders,
};
