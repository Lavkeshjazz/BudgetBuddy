const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
      },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    itemsAdded:[
      {
      productURL: {
        //type: mongoose.Schema.Types.ObjectId,
        type:String,
        // unique: true,
      },
      expectedPrice: {
        type:Number,
      },
    }
    ],
  visitHistory: [{ type: Number }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
},
{ timestamps: true }
);

const User = mongoose.model("BudgetBuddy-users", userSchema);

module.exports = User;