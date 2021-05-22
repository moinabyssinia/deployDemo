const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const tgsAMRoute = require('./routes/tgs_AM'); // requring a route
const tgsMZRoute = require('./routes/tgs_MZ'); // requring a route
const homeRoute = require('./routes/home'); 
const tgDetailRoute = require('./routes/tgDetail'); 

const PORT = process.env.PORT || 3000;

require('dotenv').config();

// middlewares go here


// routes go here
app.use(express.static("public")); // to locate css and other files

app.use('/home', homeRoute);
app.use('/tgsa2m', tgsAMRoute);
app.use('/tgsm2z', tgsMZRoute);
app.use('/tgDetail', tgDetailRoute);


// connect to mongodb atlas
mongoose.connect(
    process.env.MONGO_URL1, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected to mongodb atlas");

    tgName = 'akyab__sittwe__907a_myanmar'

    mongoose.connection.db.collection(tgName, function (err, collection) {

        // sort the collection with date - date : 1 (ascending)
        collection.find({}).sort({date : 1}).toArray(function(err, data){
        // console.log(data); // it will print your collection data
        const timeSeries = data;
        // console.log(timeSeries[0].date);
        // res.render('obsSurge', {timeSeries, tgName});
        mongoose.connection.close();
        });
    });


})
.catch((error) => {
    console.log("Error connecting to mongodb atlas", error);
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})