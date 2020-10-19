import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const addOrderItems = expressAsyncHandler(async (request, response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = request.body;
  if (orderItems && orderItems.length === 0) {
    response.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: request.user._id,
    });
    const createdOrder = await order.save();
    response.status(201).json(createdOrder);
  }
});

const getOrderById = expressAsyncHandler(async (request, response) => {
  const order = await Order.findById(request.params.id).populate(
    'user',
    'name email',
  );

  if (order) {
    response.json(order);
  } else {
    response.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById };
