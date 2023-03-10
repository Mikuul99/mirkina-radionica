const User = require('../database/models/userModel');
const { formatMongoData } = require('../helper/dbHelper');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userRegister = async ({ name, email, username, password}) => {
    try {
        const user = await User.findOne({email});
        if (user) {
            throw new Error(constants.userMessage.DUPLICATE_USER);
        }

        password = await bcrypt.hash(password, 12);
        const newUser = new User({name, email, username, password});
        let result = await newUser.save();

        return formatMongoData(result);

    } catch(error) {
        console.log('Something went wrong: Service [userRegister] ===', error);
        throw new Error(error);
    }
}

module.exports.userLogin = async ( {email, password} ) => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error(constants.userMessage.INVALID_PASSWORD);
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '1d' });

        return { token: token };

    } catch(error) {
        console.log('Something went wrong: Service [userLogin] ===', error);
        throw new Error(error);
    }
}