const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/',productController.createProduct);

router.get('/:productId',
productController.getProductById);

router.put('/:productId',
tokenValidation.validateToken,
productController.updateProduct);

router.get('/',
joiSchemaValidation.validateQueryParams(productSchema.getAllProductSchema),
productController.getAllProducts);

router.delete('/:productId',
tokenValidation.validateToken,
productController.deleteProduct)


module.exports = router;