const express = require('express');
const router = express.Router();
const {Rate} = require('../models');

router.get('/', async (req, res) => {
    try{ const listOfRates = await Rate.findAll();
        res.json(listOfRates);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }

    
});


router.post('/', async (req, res) => {
    try{
        const rateData = req.body;
        const newRate = await Rate.create(rateData);
        res.status(201).json(newRate);
    }
       catch(error)
      {
          res.status(500).json({error : 'Internal Server Error'});
     }
});

module.exports = router;
