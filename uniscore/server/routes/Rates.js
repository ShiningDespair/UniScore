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
        const rates = await Rate.findAll({ where: { uni_id: id } }); 
        res.json(rates);
    } catch (error) {
        console.error(error);
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


// Yorum yapma endpoint'ini güncelle
router.post('/', validateToken, async (req, res) => {
    try {
        const { com, rate_amount, uni_id, visibility } = req.body;
        const stu_id = req.user.stu_id; // JWT token'dan öğrenci ID'sini alıyoruz

        // Öğrencinin daha önce aynı üniversite için yorum yapmadığını kontrol et
        const existingRating = await Rate.findOne({ where: { uni_id, stu_id } });
        if (existingRating) {
            return res.status(400).json({ error: 'You have already rated this university' });
        }

        // Yeni yorum oluştur
        const newRate = await Rate.create({ com, rate_amount, uni_id, stu_id, visibility });
        res.status(201).json(newRate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;
