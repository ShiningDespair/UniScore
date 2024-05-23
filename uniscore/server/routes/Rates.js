const express = require('express');
const router = express.Router();
const { Rate, Student, University } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

// Get all rates
router.get('/', async (req, res) => {
    try {
        const listOfRates = await Rate.findAll();
        res.json(listOfRates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get student by stu_id
router.get('/bystuId/:stu_id', async (req, res) => {
    try {
        const stu_id = req.params.stu_id;
        const student = await Student.findByPk(stu_id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get rates by university ID
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

// Post a new rate
router.post('/', validateToken, async (req, res) => {
    try {
        const { com, rate_amount, uni_id, visibility } = req.body;
        const stu_id = req.user.stu_id;

        const student = await Student.findOne({ where: { stu_id } });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const studentUniId = String(student.uni_id).trim();
        const rateUniId = String(uni_id).trim();

        if (studentUniId !== rateUniId) {
            return res.status(403).json({ error: 'You can only comment on your own university' });
        }

        const existingRating = await Rate.findOne({ where: { uni_id: rateUniId, stu_id } });
        if (existingRating) {
            return res.status(400).json({ error: 'You have already rated this university' });
        }

        const newRate = await Rate.create({ com, rate_amount, uni_id: rateUniId, stu_id, visibility });

        //Submit the rate
        const university = await University.findByPk(req.body.uni_id);
        if (university) {
            const currentRate = university.uni_rate || 0; // Get current rate or default to 0
            const currentRateCount = university.uni_rate_count || 0; // Get current rate count or default to 0
            const newTotalRate = currentRate + rate_amount; // Add the new rate_amount to the current rate
            const newRateCount = currentRateCount + 1; // Increase the rate count by 1
            await university.update({ uni_rate: newTotalRate, uni_rate_count: newRateCount }); // Update the university's rate and rate count
        }

        res.status(201).json(newRate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a rate
router.delete('/deleteRate/:com_id', validateToken, async (req, res) => {
    try {
        const com_id = req.params.com_id;
        const stu_id = req.user.stu_id;

        const rate = await Rate.findOne({ where: { com_id, stu_id } });
        if (!rate) {
            return res.status(404).json({ error: 'Yorum bulunamadı veya kullanıcı yetkili değil' });
        }

        await rate.destroy();
        res.json({ message: 'Yorum başarıyla silindi' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu Hatası' });
    }
});

module.exports = router;
