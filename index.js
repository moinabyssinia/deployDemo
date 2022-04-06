const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const tgsAMRoute = require('./routes/tgs_AM'); // requring a route
const tgsMZRoute = require('./routes/tgs_MZ'); // requring a route
const homeRoute = require('./routes/home'); 
const tgDetailRoute = require('./routes/tgDetail'); 
const obsSurgeRoute = require('./routes/obsSurge'); 
const searchTGRoute = require('./routes/searchTG'); 
const cptRoute = require('./routes/cpt'); 
const cptDetailRoute = require('./routes/cptDetail'); 
const cptDisplayRoute = require('./routes/cptDisplay'); 
const cpttwcrera20c = require('./routes/cptpage'); 
const trendstwcrera20c = require('./routes/trends'); 
const trendsSensAnalysis = require('./routes/trendsens'); 

const PORT = process.env.PORT || 3000;

require('dotenv').config();

// middlewares go here


// routes go here
app.use(express.static("public")); // to locate css and other files
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/home', homeRoute);
app.use('/tgsa2m', tgsAMRoute);
app.use('/tgsm2z', tgsMZRoute);
app.use('/tgDetail', tgDetailRoute);
app.use('/tgDetail/obs_surge', obsSurgeRoute);
app.use('/search', searchTGRoute);
app.use('/cpt', cptRoute);
app.use('/cpt/twcr_era20c', cptDetailRoute);
app.use('/cptplot', cptDisplayRoute);
app.use('/changepoint', cpttwcrera20c);
app.use('/trends', trendstwcrera20c);
app.use('/trendsens', trendsSensAnalysis);

app.engine('ejs', ejsMate); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})