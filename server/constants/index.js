module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    productMessage: {
        PRODUCT_CREATED: 'Product Created Successfully',
        PRODUCT_FETCHED: 'Product Fethced Successfully',
        PRODUCT_NOT_FOUND: 'Product Not Found',
        PRODUCT_UPDATED: 'Product Updated Successfuly',
        PRODUCT_DELETED: 'Product Deleted Successfully'
    },
    userMessage: {
        USER_CREATED: 'User Created Successfully',
        USER_LOGIN: 'Login Successful',
        USER_NOT_FOUND: 'User Not Found',
        USER_VALIDATED: 'User Validated Successfully',
        DUPLICATE_USER: 'User Already Exists',
        INVALID_PASSWORD: 'Invalid Password'
    },
    requestValidationMessage: {
        BAD_REQUEST: 'Invalid fields!',
        TOKEN_MISSING: 'Token Missing From Headers'
    },
    databaseMessage: {
        INVALID_ID: 'Invalid ID'
    }
}