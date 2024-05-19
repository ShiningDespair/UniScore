const express = require('express');
const router = express.Router();
const {Rate,Student} = require('../models');
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get('/', async (req, res) => {
    try{ const listOfRates = await Rate.findAll();
        res.json(listOfRates);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }

    
});

//yorum yapan student ismini bulma 

router.get('/bystuId/:stu_id', async (req, res) => {
    try {
        const stu_id = req.params.stu_id;
        const student = await Student.findByPk(stu_id);
        res.json(student);
    }  catch (error) {
        console.error(error); // Hatanın ayrıntılarını konsola yazdırın
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});




router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const rates = await Rate.findAll({WHERE: {uni_id: id}});
        res.json(rates);
    }  catch (error) {
        console.error(error); // Hatanın ayrıntılarını konsola yazdırın
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});


router.post('/',validateToken, async (req, res) => {
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
