const mongoose = require('mongoose');
const { itemSchema } = require('./items');

const restaurantSchema = new mongoose.Schema({
  restId: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  restName: {
    type: String
  },
  restAddress: {
    type: String
  },
  restZip: {
    type: String
  },
  restPhone: {
    type: String
  },
  restImage: {
    type: String,
    default: ""
  },
  restDesc: {
    type: String,
    default: ""
  },
  items: [itemSchema]
});

const restaurants = mongoose.model('restaurants', restaurantSchema);
module.exports = restaurants;
module.exports.restaurantSchema = restaurantSchema;
