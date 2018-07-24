const Item = require('../models/model_coffee')
const Cart = require('../models/model_cart')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = {

  getItem(req, res) {

    Item.find({}, (err, data) => {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(200).json({ data })
      }
    })

  },

  addItem(req, res) {

    console.log(req);

    const newItem = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      picture: req.file.cloudStoragePublicUrl,
			detail: req.body.detail
    }

    Item.create(newItem, (err, success) => {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(201).json('success add new item');
      }
    })

  },

  getDetail (req, res) {

    Item.find({ _id: req.params.id}, (err, data) => {
      if (err) {
        res.status(404).json(err)
      } else {
        res.status(200).json(data)
      }
    })

  },

  edit (req, res) {
    Item.find({ _id: req.body._id }, (err, data) => {
      data[0].name = req.body.name
      data[0].price = req.body.price
      data[0].detail = req.body.detail
      data[0].stock = req.body.stock
      data[0].save()
      res.status(201).json('success update item data')
    })
  },

  deleteItem(req, res){

    Item.deleteOne({ _id: req.params.id }, (err, data) => {
      res.status(200).json('deleted')
    })

  }

};
