const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

// view a list of all tide gauges
router.get('/', (req, res) => {

    // connect to mongodb atlas - but is it necessary to connect again?
    mongoose.connect(
        process.env.MONGO_URL4, 
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to twcrcpt");

        // just read one collection
        mongoose.connection.db.collection("twcrCpt", function(err, collection){
            collection.find({}).sort({tg : 1}).toArray( function(err, data) {
                // console.log(data);
                let tgNames = [];
                for(let tg of data){
                    tgNames.push(tg.tg)
                }

                res.render('twcrCpt', {tgNames})
            })

            
        })
        
    })
    .catch(error => {
        console.log("error connecting to twcrcpt", error);
        })
})

module.exports = router;