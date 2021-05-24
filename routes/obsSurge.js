const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/:tg', (req, res) => {
    const id = req.params;
    tgName = id.tg
    console.log(tgName);

    // choose between gssrDB1 or gssrDB2
    let connectString = process.env.MONGO_URL1
    if(tgName > 'mayport,fl_753a_usa') {
        connectString = process.env.MONGO_URL2;
    }

    // connect to gssrDB1 or gssrDB2
    
    mongoose.connection.close(); // close previous connections
    
    mongoose.connect(
        connectString, 
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to gssrDB1");
        
        // get tgDetails - first parameter of first callback is collection name
        mongoose.connection.db.collection(tgName, function (err, collection){
            collection.find({}).sort({date : 1}).toArray(function(err, data){
                // console.log(data); // it will print your collection data

                res.render('obsSurge', { data, tgName });

                mongoose.connection.close();
            });
        });
    })
    .catch(error => {
        console.log("error connecting to gssrDB1", error);
    })
})

module.exports = router;