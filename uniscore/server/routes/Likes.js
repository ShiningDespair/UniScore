const express = require('express');
const router = express.Router();
const { Like, Rate, Student } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

// Like komutu
router.post('/like/:com_id', validateToken, async (req, res) => {
    try {
        const com_id = req.params.com_id;
        const stu_id = req.user.stu_id;

        // Yorumun var olup olmadığını kontrol et
        const rate = await Rate.findOne({ where: { com_id } });
        if (!rate) {
            return res.status(404).json({ error: 'Yorum bulunamadı' });
        }

        // Öğrencinin bu yorumu daha önce beğenip beğenmediğini kontrol et
        const existingLike = await Like.findOne({ where: { com_id, stu_id } });
        if (existingLike) {
            if (existingLike.like_value === 1) {
                // Kullanıcı zaten beğenmişse beğeniyi geri çek
                await existingLike.destroy();
                return res.json({ message: 'Yorum beğenisi geri çekildi' });
            } else if (existingLike.like_value === -1) {
                // Kullanıcı beğenmemişse, beğeniye geçiş yap
                existingLike.like_value = 1;
                await existingLike.save();
                return res.json({ message: 'Yorum beğenildi', like: existingLike });
            }
        }

        // Like tablosuna yeni bir satır ekle
        await Like.create({
            com_id,
            stu_id,
            like_value: 1 // Beğendiği için +1 değeri
        });

        res.json({ message: 'Yorum beğenildi' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu Hatası' });
    }
});

// Dislike komutu
router.post('/dislike/:com_id', validateToken, async (req, res) => {
    try {
        const com_id = req.params.com_id;
        const stu_id = req.user.stu_id;
        // Yorumun var olup olmadığını kontrol et
        const rate = await Rate.findOne({ where: { com_id } });
        if (!rate) {
            return res.status(404).json({ error: 'Yorum bulunamadı' });
        }
        // Öğrencinin bu yorumu daha önce beğenip beğenmediğini kontrol et
        const existingLike = await Like.findOne({ where: { com_id, stu_id } });
        console.log(existingLike);
        if (existingLike) {
            if (existingLike.like_value === -1) {
                // Kullanıcı zaten beğenmemişse beğenmeyi geri çek
                await existingLike.destroy();
                return res.json({ message: 'Yorum beğenmeme geri çekildi' });
            } else if (existingLike.like_value === 1) {
                // Kullanıcı beğenmişse, beğenmemeye geçiş yap
                existingLike.like_value = -1;
                await existingLike.save();
                return res.json({ message: 'Yorum beğenilmedi', like: existingLike });
            }
        }

        // Like tablosuna yeni bir satır ekle
        await Like.create({
            com_id,
            stu_id,
            like_value: -1 // Beğenmediği için -1 değeri
        });

        res.json({ message: 'Yorum beğenilmedi' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sunucu Hatası' });
    }
});

router.get('/:com_id', async (req, res) => {
    try {
        const com_id = req.params.com_id;
        const likes = await Like.findAll({ where: { com_id } });
        let sum = 0; // Initialize sum variable
        
        // Iterate over each element in the likes array
        likes.forEach(like => {
            sum += like.like_value; // Add the like_value to the sum
        });
        res.json({ sum }); // Send the total sum as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
