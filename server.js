const express = require('express');
const app = express();
const connectDB = require('./connectDB/conncection');
const MethodOverride = require("method-override");

const mongoose = require('mongoose');
const Item = require('./connectDB/Item');

connectDB();



const port = 3000;

app.listen(port, ()=>{console.log("Connection to Server successful!");})

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
    newItem.dateAdded = `${dateAdded.toDateString()} at ${dateAdded.getHours()}:${dateAdded.getMinutes()}`;
    if(newItem.imgURL == ""){
        newItem.imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
    }
    await newItem.save();
    res.redirect('/list');
})


// app.delete('/items/:itemID', async(req,res)=>{
//     await Item.findByIdAndDelete(req.params.itemID);
//     res.redirect('/items');
// })

app.delete('/items/:itemID', async(req,res)=>{
    await Item.findByIdAndDelete(req.params.itemID);
    res.redirect('/list');
})



// app.get('/testingArea', async(req,res)=>{
//     const items = await Item.find({});
//     res.render("testingArea", {items});
// })

app.get('/list', async(req,res)=>{
    const items = await Item.find({});
    res.render("table", {items});
})

app.get('/list/:itemID', async(req,res)=>{
    const item = await Item.findOne({_id:req.params.itemID});
    res.render("itemData", {item});
})

app.get('/list/:itemID/edit', async(req,res)=>{
    const item = await Item.findOne({_id:req.params.itemID});
    res.render("edit", {item});
})

app.get('/addItem', (req,res)=>{
    res.render("addItem");
})

app.delete('/list/:itemID', async(req,res)=>{
    await Item.findByIdAndDelete(req.params.itemID);
    res.redirect('/list');
})

app.patch('/items/:itemID', async(req,res)=>{
    const dateUpdated = new Date();
    const dateUpdatedString = `${dateUpdated.toDateString()} at ${dateUpdated.getHours()}:${dateUpdated.getMinutes()}`;
    if(req.body.imgURL == ""){
            req.body.imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
    }
    await Item.updateOne({_id:req.params.itemID}, {$set:req.body, dateAdded: dateUpdatedString});
    console.log("UPDATE");
    
    res.redirect(`/items/${req.params.itemID}`);
})

app.get('/items/:itemID/edit', async(req,res)=>{
    const item = await Item.findOne({_id:req.params.itemID});
    res.render("edit", {item});
})
app.delete('/items/:itemID', async(req,res)=>{
    await Item.findByIdAndDelete(req.params.itemID);
    res.redirect('/list');
})