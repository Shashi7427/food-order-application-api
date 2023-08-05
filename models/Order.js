const mongoose = require('mongoose');

// Define the schema for the ordered item
const orderedItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount:{type:Number,required:true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  street: { type: String, required: true },
});

const OrderSchema = mongoose.Schema(
  {
    userAddress:userSchema,
    orderedItems: [orderedItemSchema],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
