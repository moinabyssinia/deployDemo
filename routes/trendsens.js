const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.title = "Trend Sensitivity Analysis";
    res.render('trendsens');
})

module.exports = router;