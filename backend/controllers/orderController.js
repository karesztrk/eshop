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

export { addOrderItems };
