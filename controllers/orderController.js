const Order = require("../models/Order");
const sendEmail = require('../utils/sendEmail')

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");

const createOrder = async (req, res) => {
  const { orderedItems, userAddress } = req.body;

  if (!orderedItems || !userAddress) {
    throw new CustomError.BadRequestError("No cart items or address provided");
  }

  await Order.create({
    orderedItems,
    userAddress,
    user:req.user.userId
  });
  let admin = await User.findOne({role:'admin'});
  if (admin){
    console.log(admin.email,req.user.email,"Here we are ",req.user)
    let message = JSON.stringify({userAddress,orderedItems})
    await sendEmail({
      to: admin.email,
      subject: "Order  Confirmation",
      html: `<h4> Hello, Here is our new order </h4> ${message}`,
    });
    
    await sendEmail({
      to: req.user.email,
      subject: "Order  Confirmation",
      html: `<h4> Hello, Here is your new order details</h4> ${message}`,
    });
  }
  
  
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Order placed successfuly",
  });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
};
