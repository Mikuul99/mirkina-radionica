const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');
const tokenValidation = require('../middleware/tokenValidation');


// Register
router.post('/register',
joiSchemaValidation.validateBody(userSchema.userRegister),
userController.registerUser);

// Login
router.post('/login',
joiSchemaValidation.validateBody(userSchema.userLogin),
userController.userLogin);

router.post('/auth', tokenValidation.validateToken)

module.exports = router;
