const express = require('express');
const app = express();
const connectDB = require('./connectDB/conncection');
const MethodOverride = require("method-override");

const mongoose = require('mongoose');
const Item = require('./connectDB/Item');

connectDB();



const port = 3000;

app.listen(port, ()=>{console.log("Connection to Server succ");})

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(MethodOverride('_method'));
app.set("view engine", "ejs");

app.get('/', (req, res)=>{
    res.render("home");
})

app.get('/items', async(req,res)=>{
    const items = await Item.find({});
    res.render("items", {items});
})

app.get('/items/:itemID', async(req,res)=>{
    const item = await Item.findOne({_id:req.params.itemID});
    res.render("itemData", {item});
})

app.post('/items', async(req,res)=>{
    console.log(`${req.body} was added`);
    const newItem = new Item(req.body);
    const dateAdded = new Date();
    newItem.dateAdded = dateAdded;
    await newItem.save();
    res.redirect('/items');
})


app.delete('/items/:itemID', async(req,res)=>{
    await Item.findByIdAndDelete(req.params.itemID);
    res.redirect('/items');
})


app.get('/testingArea', async(req,res)=>{
    res.render("testingArea");
})
