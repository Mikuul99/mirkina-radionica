const constants = require('../constants');
const mongoose = require('mongoose');

module.exports.formatMongoData = (data) => {
    if(Array.isArray(data)) {
        let newDataList = [];
        for(value of data) {
            newDataList.push(value.toObject());
        }
        return newDataList;
    }
    return data.toObject();
}

module.exports.checkObjectId = (productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error(constants.databaseMessage.INVALID_ID);
    }
}