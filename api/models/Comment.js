const mongoose = require('mongoose')
const { Schema } = mongoose;

const Comment = new Schema({
    user:Object,
    content:String,
    time:String,
    bookingId:String
});
const CommentModel = mongoose.model('Comment', Comment);
module.exports = CommentModel
