const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
    },
    amount: {
        type : Number
    },
    currency: {
        type : String
    },
    paymentIntentId: {
        type : String
    },
    customerId: {
        type : String
    },
    status: { 
        type: String, 
        default: "pending" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);