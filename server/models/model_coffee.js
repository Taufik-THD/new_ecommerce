const mongoose = require('mongoose');
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: { type:String, required: true },
  price: { type:Number, required: true },
  stock: { type:Number, required: true },
  picture: { type:String, required: true },
  detail: { type:String, required: true }
},{
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
