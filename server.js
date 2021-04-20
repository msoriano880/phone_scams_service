const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ScrapedData = require('./schema');

//connection to mongodb
mongoose.connect('mongodb+srv://msoriano:goldtree299@scrapednumbers.pyjdr.mongodb.net/scrapedNumbers?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
    console.log('connected to database!')
});

const publicFolder = path.join(__dirname, './public');
app.use(express.static(publicFolder));

app.use(express.json());
app.use(express.static('./'));

//get users data and finds in the mongodb
app.post('/api', function(req, res) {
    ScrapedData.findOne(req.body)
        .then(function(data) {
          res.json({
            status: 'success',
            Phone_Number: data.Phone_Number,
            VictimAndCountry: data.country,
            Details: data.Details
        });
    })
    .catch(function(error) {
        console.log('trusted number')
        res.json(error);
    });
});

//connection to server
app.listen(3000, function(req, res){
    console.log('server connected to port3000!')
});