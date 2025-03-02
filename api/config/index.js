const mongoose = require('mongoose')
async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bookingApp')
        console.log('connect Succesfully');
    } catch (error) {
        console.log('connect falid');
    }
}
module.exports={connect}