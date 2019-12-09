const mongoose = require("mongoose");
const { restaurantSchema } = require('./restaurants');

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true,
      unique: true
    },
    userPassword: {
      type: String,
      required: true
    },
    userPhone: {
      type: String,
      required: true
    },
    userAddress: {
      type: String,
      default: ""
    },
    userZip: {
      type: String,
      default: ""
    },
    userImage: {
      type: String,
      default: ""
    },
    accountType: {
      type: Number,
      required: true,
      enum: [1, 2]
    },
    restaurant: restaurantSchema
  }
);

//Model
const Users = mongoose.model("users", userSchema);
module.exports = Users;
// module.exports.userSchema = userSchema;
