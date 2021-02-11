const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    dateAdded: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: true,
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
