const mongoose = require('mongoose')
const { Schema } = mongoose;

const Places = new Schema({
    title: String,
    address: String,
    addedPhotos: [String],
    desc: String,
    maxGuests: Number,
    price:Number
    
});
const PlacesModel = mongoose.model('Places', Places);
module.exports = PlacesModel
