const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PicturesModelSchema = new Schema({
    name: String,
    path: String,
    destination: String,
    createdOn: {type: Date, default: Date.now()},
    updatedOn: {type: Date, default: Date.now()}
});


module.exports = mongoose.model('Pictures', PicturesModelSchema);