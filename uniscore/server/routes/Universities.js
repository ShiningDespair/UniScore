const express = require('express');
const router = express.Router();
const { University } = require('../models');

router.get('/', async (req, res) => {
    try {
        const listOfUniversities = await University.findAll();
        res.json(listOfUniversities);
    }  catch (error) {
        console.error(error); // Hatanın ayrıntılarını konsola yazdırın
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

router.get('/byId/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const university = await University.findByPk(id);
        res.json(university);
    }  catch (error) {
        console.error(error); // Hatanın ayrıntılarını konsola yazdırın
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

router.post('/', async (req, res) => {
    try {
        const universityData = req.body;
        const newUniversity = await University.create(universityData);
        res.status(201).json(newUniversity);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
