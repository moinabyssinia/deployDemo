const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/tg/:tgName/reanalysis/:reanalysisName', (req, res) => {
    tgName = req.params.tgName;
    reanalysisName = req.params.reanalysisName;

    const cptUrl = {"twcr" : process.env.twcrCptUrl,
                  "era20c" : process.env.era20cCptUrl,
                  "both" : process.env.twcrEra20cUrl}
    

    const imageUrl = cptUrl[reanalysisName] + tgName;

    // console.log(cptUrl[reanalysisName]);
    
    res.locals.title = `${reanalysisName} CPT Plot | ${tgName}`
    res.render('cptPlot', { imageUrl })
})

module.exports = router;

