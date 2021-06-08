const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/:url', (req, res) => {
    const id = req.params;
    const cptUrl = process.env.twcrCptUrl;
    // console.log(cptUrl + id.url);

    const imageUrl = cptUrl + id.url;

    res.render('twcrCptPlot', { imageUrl })
})

module.exports = router;

