const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

require('dotenv').config();

// connect to mongodb atlas
mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected to mongodb atlas");

    //trying to get collection names
    mongoose.connection.db.listCollections().toArray(function (err, names) 
    {

        for (let tgName of names){
            console.log(tgName.name); // [{ name: 'dbname.myCollection' }]
        }
        module.exports.Collection = names;

    });

    tgName = 'akyab__sittwe__907a_myanmar'

    mongoose.connection.db.collection(tgName, function (err, collection) {

        // sort the collection with date - date : 1 (ascending)
        collection.find({}).sort({date : 1}).toArray(function(err, data){
        // console.log(data); // it will print your collection data
        const timeSeries = data;
        console.log(timeSeries[0].date);
        // res.render('obsSurge', {timeSeries, tgName});
        mongoose.connection.close();
        });
    });


})
.catch((error) => {
    console.log("Error connecting to mongodb atlas", error);
})



// start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})