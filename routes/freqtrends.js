const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {

    res.locals.title = "Surge Frequency Trends";   
    res.render('freqtrends');

})

module.exports = router;