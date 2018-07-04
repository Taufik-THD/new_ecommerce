const express = require('express')
const router = express.Router()
const { getUsers, signUp, signIn } = require("../controllers/user_controller");
const { transaction, getTransaction, done } = require("../controllers/transaction_controller")

router.get("/", getUsers)
router.get('/gettransaction', getTransaction)
router.post("/signup", signUp)
router.post("/signIn", signIn)
router.post('/transaction', transaction)
router.post('/done', done)

module.exports = router
