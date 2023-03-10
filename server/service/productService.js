const Product = require('../database/models/productModel');
const { formatMongoData, checkObjectId } = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.createProduct = async (serviceData) => {
    try {
        let product = new Product({...serviceData});
        let result = await product.save();
        return formatMongoData(result);
    } catch(error) {
        console.log('Something went wrong: Service [createProduct] ===', error);
        throw new Error(error);
    }
}

module.exports.getAllProducts = async ({skip = 0, limit = 0}) => {
    try {
        let products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(products);
    } catch(error) {
        console.log('Something went wrong: Service [getAllProducts] ===', error);
        throw new Error(error);
    }
}

module.exports.getProductById = async ({ productId }) => {
    try {
        checkObjectId(productId);
        let product = await Product.findById(productId);
        if(!product) {
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(product);
    } catch(error) {
        console.log('Something went wrong: Service [getProductById] ===', error);
        throw new Error(error);
    }
}

module.exports.updateProduct = async ({ productId, updateInfo }) => {
    try {
        checkObjectId(productId);
        let product = await Product.findOneAndUpdate(
            {_id: productId},
            updateInfo,
            {new: true}
        )
        if(!product) {
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(product);
    } catch(error) {
        console.log('Something went wrong: Service [updateProduct] ===', error);
        throw new Error(error);
    }
}

module.exports.deleteProduct = async ({ productId }) => {
    try {
        checkObjectId(productId);
        let product = await Product.findByIdAndDelete(productId)
        if(!product) {
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(product);
    } catch(error) {
        console.log('Something went wrong: Service [deleteProduct] ===', error);
        throw new Error(error);
    }
}