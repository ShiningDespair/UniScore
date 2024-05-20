const express = require('express');
const router = express.Router();
const { Rate, Student } = require('../models');
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

        // Log user and request body for debugging
        console.log('User object:', req.user);
        console.log('Request body:', req.body);

        // Fetch the student to verify university ID
        const student = await Student.findOne({ where: { stu_id } });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const studentUniId = String(student.uni_id).trim();
        const rateUniId = String(uni_id).trim();

        // Check if the student is trying to rate their own university
        if (studentUniId !== rateUniId) {
            console.log("ID DOESNT MATCH " + studentUniId + " " + rateUniId);
            return res.status(403).json({ error: 'You can only comment on your own university' });
        } else {
            console.log("ID MATCHES");
        }

        // Check if the user has already rated this university
        const existingRating = await Rate.findOne({ where: { uni_id: rateUniId, stu_id } });
        if (existingRating) {
            return res.status(400).json({ error: 'You have already rated this university' });
        }

        // Create a new rating
        const newRate = await Rate.create({ com, rate_amount, uni_id: rateUniId, stu_id, visibility });
        res.status(201).json(newRate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//yeni eklendi

router.delete('/deleteRate/:com_id', validateToken, async (req, res) => {
    try {
        const com_id = req.params.com_id;
        const stu_id = req.user.stu_id; // JWT token'dan öğrenci ID'sini alıyoruz

        // Silinecek yorumu bul
        const rate = await Rate.findOne({ where: { com_id, stu_id } });

        if (!rate) {
            return res.status(404).json({ error: 'Yorum bulunamadı veya kullanıcı yetkili değil' });
        }

        // Yorumu sil
        await rate.destroy();

        res.json({ message: 'Yorum başarıyla silindi' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu Hatası' });
    }
});



// Yorum beğenme işlemi
router.post('/like/:com_id', validateToken, async (req, res) => {
    try {
        const com_id = req.params.com_id;
        const stu_id = req.user.stu_id;

        const rate = await Rate.findOne({ where: { com_id } });
        if (!rate) {
            return res.status(404).json({ error: 'Yorum bulunamadı' });
        }

        if (rate.like_dislike === stu_id) {
            return res.status(400).json({ error: 'Bu yorumu zaten beğendiniz' });
        }

        rate.like_dislike = stu_id;
        await rate.save();

        res.json({ message: 'Yorum beğenildi', rate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu Hatası' });
    }
});

// Yorum beğenmeme işlemi
 router.post('/dislike/:com_id', validateToken, async (req, res) => {
    try {
        const com_id = req.params.com_id;
        const stu_id = req.user.stu_id;

        const rate = await Rate.findOne({ where: { com_id } });
        if (!rate) {
            return res.status(404).json({ error: 'Yorum bulunamadı' });
        }

        if (rate.like_dislike === -stu_id) {
            return res.status(400).json({ error: 'Bu yorumu zaten beğenmediniz' });
        }

        rate.like_dislike = -stu_id;
        await rate.save();

        res.json({ message: 'Yorum beğenilmedi', rate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu Hatası' });
    }
});




module.exports = router;
