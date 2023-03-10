const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    price: Number,
    carousel: [{ imageUrl: String }],
    category: String,
    komplet: {
        ogradica: {type: String},
        masne: {type: String},
        posteljina: {type: String}
    },
    gnezdo: String,
    additional: [{
        type: String
    }],
    dezen: String
},
    {
        timestamps: true,
        toObject: {
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });

module.exports = mongoose.model('Product', productSchema);