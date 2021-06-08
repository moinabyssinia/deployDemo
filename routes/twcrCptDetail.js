const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

// view a list of all tide gauges
router.get('/:tgName', (req, res) => {

    const tg = req.params;
    console.log(`tide gauge ${ tg.tgName }`);

    // connect to mongodb atlas - but is it necessary to connect again?
    mongoose.connection.close();

    mongoose.connect(
        process.env.MONGO_URL4, 
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to twcrcpt");

        // just read one collection
        mongoose.connection.db.collection("twcrCpt", function(err, collection){
            collection.find({tg : tg.tgName+".csv"}).sort({tg : 1}).toArray( function(err, data) {
                console.log(data);

                const cptUrl = process.env.twcrCptUrl;

                res.render('twcrCptDetail', { data, cptUrl });
            })

            
        })
        
    })
    .catch(error => {
        console.log("error connecting to twcrcpt", error);
        })
})

module.exports = router;