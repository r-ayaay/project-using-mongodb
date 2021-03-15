const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://bruh:moment@cluster0.wvalo.mongodb.net/myApp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{console.log("Connection to Atlas successful!")})

};

module.exports = connectDB;