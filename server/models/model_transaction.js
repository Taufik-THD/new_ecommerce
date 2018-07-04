const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
  userDetail: { type:Object },
  receiver: { type: Object },
  items: { type: Array },
  totalPayment: { type: Number },
  status: { type: Boolean }
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;
