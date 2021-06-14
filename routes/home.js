const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.title = "Home";
    res.render('home');
})

module.exports = router;