const express = require('express')
const productController = require('./controller/product.controller.js')
const productRouter = express.Router()

productRouter.get('/', productController.getProduct)
productRouter.get('/:id', productController.getProductById)
productRouter.post('/', productController.postProduct)
productRouter.delete('/:id', productController.deleteProduct)

module.exports = productRouter;