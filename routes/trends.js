const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {

    res.locals.title = "Trend Analysis Results";   
    res.render('trends');

})

module.exports = router;