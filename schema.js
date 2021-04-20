const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
    Phone_Number: String,
    VictimAndCountry: String,
    Details: String
});

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

module.exports = ScrapedData;