'use strict'
const express = require('express')
const router = express.Router()
const multer = require('multer');
const { sendUploadToGCS } = require('../middlewares/uploadGcs');
const { addItem, getItem, deleteItem, getDetail, edit } = require('../controllers/item_controller')
const upload = multer({
 storage  : multer.memoryStorage(),
 limits   : {
   fileSize: 30*1024*1024
   }
})

/* GET main endpoint. */
router.get('/', getItem)

router.post('/', upload.single('image'), sendUploadToGCS, addItem)

router.delete('/:id', deleteItem)

router.get('/detail/:id', getDetail)

router.post('/edit', edit)

module.exports = router
