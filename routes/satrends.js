const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {

    res.locals.title = "Satellite-Era Trends";   
    res.render('satrends');

})

module.exports = router;