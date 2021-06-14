const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    const tg = req.query;
    console.log(tg);

    // choose between gssrDB1 or gssrDB2
    let connectString = process.env.MONGO_URL1
    if(tg.name > 'mayport,fl_753a_usa') {
        connectString = process.env.MONGO_URL2;
    }

 // connect to gssrDB1 or gssrDB2
    
 mongoose.connection.close(); // close previous connections
    
 mongoose.connect(
     connectString, 
     {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
     console.log(`connected to ${connectString}`);
     
        //trying to get collection names
        mongoose.connection.db.listCollections().toArray(function (err, names) 
        {
            const tgNames = [];
            const tgTitle = "A-M";
            for (let tgName of names){
                // console.log(tgName.name); // [{ name: 'dbname.myCollection' }]
                console.log(`searched tg: ${tg.name}`);
                console.log(`checking tg: ${tgName.name}`);

                if (tgName.name.includes(tg.name)) {
                    tgNames.push(tgName.name)
                }
            }
            console.log('found results are: ');
            console.log(tgNames.toString());

            res.locals.title = "Search Results";
            res.render('search', { tgNames });

            mongoose.connection.close();
        });
    })
 .catch(error => {
     console.log(`error connecting to ${connectString}`, error);
 })
})

module.exports = router;