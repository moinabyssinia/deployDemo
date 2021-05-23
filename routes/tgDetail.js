const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/:tg', (req, res) => {
    const id = req.params;
    tgName = id.tg;
    console.log(`tide gauge is ${tgName}`);

    // connect to gssrCountries

    mongoose.connection.close(); // close previous connections
    
    mongoose.connect(
        process.env.MONGO_URL3, 
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to gssrCountries");
        
        // get tgDetails - first parameter of first callback is collection name
        mongoose.connection.db.collection('georefData', function (err, collection){
            collection.find({name : tgName}).toArray(function(err, data){
                console.log(data); // it will print your collection data

                res.render('tgDetail', {data});

                mongoose.connection.close();
            });
        });
    })
    .catch(error => {
        console.log("error connecting to gssrCountries", error);
    })

})

module.exports = router;