const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

//connection to mongodb
mongoose.connect('mongodb+srv://msoriano:goldtree299@scrapednumbers.pyjdr.mongodb.net/scrapedNumbers?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
    console.log('connected to database!')
});

const publicFolder = path.join(__dirname, './public');
app.use(express.static(publicFolder));

//connection to server
app.listen(3000, function(req, res){
    console.log('server connected to port3000!')
});