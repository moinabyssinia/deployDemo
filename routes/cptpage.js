const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    // const id = req.params;
    // tgName = id.tg;
    // console.log(`tide gauge is ${tgName}`);
    
    // connect to twcrEra20cCPT

    mongoose.connection.close(); // close previous connections
    
    mongoose.connect(
        process.env.cptDataUrl, 
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to twcrEra20cCPT");
        
        // /* to search details of a tide gauge */
        // // get tgDetails - first parameter of first callback is collection name
        // mongoose.connection.db.collection('cptData', function (err, collection){
        //     collection.find({tg : tgName}).toArray(function(err, data){
        //         console.log(data); // it will print your collection data

        //         res.locals.title = id.tg;   
        //         res.send(data)
        //         // res.render('cptpage', {data});

        //         mongoose.connection.close();
        //     });
        // });

        /* to list all items in the collection */
        mongoose.connection.db.collection('cptData', function (err, collection){
            collection.find().toArray(function(err, data){
                // console.log(data); // it will print your collection data

                res.locals.title = "Changepoint Analysis Results";   
                // res.send(data)
                res.render('cptpage', {data});

                mongoose.connection.close();
            });
        });


    })
    .catch(error => {
        console.log("error connecting to twcrEra20cCPT", error);
    })

})

module.exports = router;