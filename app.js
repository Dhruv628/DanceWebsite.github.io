const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/contactDance');
const bodyparser=require("body-parser");
// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    Email: String,
    Address: String,
    Desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// ENDPOINTS
app.get("/",(req,res)=>{
    
    res.status(200).render("home.pug");
});
app.get("/contact",(req,res)=>{
    
    res.status(200).render("contact.pug");
});
app.post("/contact",(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the Database!')
    }).catch(()=>{
        res.status(400).send('Item was not sent to the Database')
    })
    // res.status(200).render("contact.pug");
});

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});
