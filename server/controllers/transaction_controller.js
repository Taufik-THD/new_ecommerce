const Transaction = require('../models/model_transaction')
const Item = require('../models/model_coffee')

const jwt = require('jsonwebtoken')

module.exports = {

  transaction (req, res) {
    const userDetail = jwt.decode(req.body.token)
    const allCart = req.body.cart
    const items = []

    allCart.forEach(value => {

      const cart = {
        _id: value._id,
        name: value.name,
        price: value.price,
        qty: value.qty
      }

      items.push(cart)

    })

    items.forEach(value => {
      Item.find({ _id: value._id }, (err, data) => {
        data[0].stock = data[0].stock - value.qty
        data[0].save()
      })
    })

    const dataTransaction = {
      userDetail: [ userDetail ],
      receiver: req.body.dataTransaction,
      items: items,
      totalPayment: req.body.totalPayment,
      status: false
    }

    Transaction.create(dataTransaction, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json('success add transaction')
      }
    })
  },

  getTransaction (req, res) {
    Transaction.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data)
      }
    })
  },

  done (req, res) {
    Transaction.find({ _id: req.body.id }, (err, data) => {
      data[0].status = true,
      data[0].save()
      res.status(200).json('success update data')
    })
  }

};
