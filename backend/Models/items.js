const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  restId: {
    type: mongoose.Schema.Types.ObjectId
  },
  cuisineName: {
    type: String
  },
  itemName: {
    type: String
  },
  itemType: {
    type: String
  },
  itemPrice: {
    type: Number
  },
  itemImage: {
    type: String
  },
  itemDesc: {
    type: String
  }
});


const items = mongoose.model('items', itemSchema);
exports.items = items;
exports.itemSchema = itemSchema;