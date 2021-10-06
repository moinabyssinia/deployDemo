const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {

    res.locals.title = "Changepoint Analysis Results";   
    res.render('cptpage');

})

module.exports = router;