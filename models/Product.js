const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    price: {
      type: Number,
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide description"],
      maxlength: [1000, "Name cannot be more than 1000 characters"],
    },
  },
  { timestamps: true }
);
// this makes the the product to be able to accept vertuals
// The { timestamps: true } option is provided as the second argument to the mongoose.Schema() function, which automatically adds createdAt and updatedAt

module.exports = mongoose.model("Product", ProductSchema);
