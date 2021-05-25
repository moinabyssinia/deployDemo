const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

// view a list of all tide gauges
router.get('/', (req, res) => {

    // connect to mongodb atlas - but is it necessary to connect again?
    mongoose.connect(
        process.env.MONGO_URL2, 
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to mongodb atlas");
        
        //trying to get collection names
        mongoose.connection.db.listCollections().toArray(function (err, names) 
        {
            const tgNames = [];
            const tgTitle = "M-Z";
            for (let tgName of names){
                console.log(tgName.name); // [{ name: 'dbname.myCollection' }]
                tgNames.push(tgName.name)
            }

            res.render('alltgs', { tgNames, tgTitle });
            mongoose.connection.close();
        });
    })
    .catch(error => {
        console.log("error connecting to gssrDB2", error);
    })
})

module.exports = router;