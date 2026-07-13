const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bikeName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bike", bikeSchema);