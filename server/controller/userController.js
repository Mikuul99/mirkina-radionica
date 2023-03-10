const userService = require('../service/userService');
const constants = require('../constants');

module.exports.registerUser = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        // const responseFromService = await userService.userRegister(req.body);
        response.status = 200;
        response.message = constants.userMessage.USER_CREATED;
        // response.body = responseFromService;
        response.body = {}
    } catch (error) {
        console.log('Something went wrong: Controller [registerUser]', error);
        response.status = 400;
        response.message = error.message;
        response.body = {};
    }
    return res.status(response.status).send(response);
}

module.exports.userLogin = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await userService.userLogin(req.body);
        response.status = 200;
        response.message = constants.userMessage.USER_LOGIN;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller [userLogin]', error);
        response.status = 400;
        response.message = error.message;
        response.body = {};
    }
    return res.status(response.status).send(response);
}