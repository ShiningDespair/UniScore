const express = require('express');
const router = express.Router();
const { Student, University } = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken')
const { validateToken } = require('../middlewares/AuthMiddleware');

console.log('JWT_SECRET:', process.env.JWT_SECRET); //çalışıyor mu kontrol


// token süresi değişkeni
const TOKEN_EXPIRY = '5000m';

router.get('/', async (req, res) => {
    try {
        const listOfStudents = await Student.findAll();
        res.json(listOfStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







router.post('/', async (req, res) => {
    try {
        const { stu_pw, uni_id, stu_mail, ...studentData } = req.body;

        // Girilen üniversiteyi veritabanında bul
        const university = await University.findByPk(uni_id);
        if (!university) {
            return res.status(400).json({ error: 'University not found' });
        }

        const studentEmail = req.body.stu_mail;

        // Üniversite mailini al DEĞİL DİREKT MAİL YAPISI VAR BİZDE
        const universityEmailStructure = university.uni_email_structure;
        console.log(studentEmail);
        console.log(university.uni_email_structure);

        // @ten sonrasını karşılaştırmak için
        const regex = new RegExp(`@.*${universityEmailStructure}$`);
                                    
        // Öğrencinin e-posta adresinin domain kısmını alın ve regex ile karşılaştırın
         if (!regex.test(studentEmail)) {
            return res.status(400).json({ error: 'Student email domain does not match university email domain' });
              
         }

           
        

        // Şifreyi hashle ve yeni öğrenci oluştur
        const hashedPassword = await bcrypt.hash(stu_pw, 10);
        const newStudent = await Student.create({ ...studentData, stu_pw: hashedPassword, uni_id, stu_mail });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error in Post' });
    }

});



router.post('/login', async (req, res) => {
    try {
        const { stu_mail, stu_pw } = req.body;
        const student = await Student.findOne({ where: { stu_mail } });

        if (!student) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Parola karşılaştırması
        const isPasswordValid = await bcrypt.compare(stu_pw, student.stu_pw);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // JSON Web Token oluşturma
        const accessToken = sign(
            { stu_mail: student.stu_mail, stu_id: student.stu_id },
            process.env.JWT_SECRET, // .env dosyasında JWT_SECRET tanımlı olmalı
            { expiresIn: TOKEN_EXPIRY } // .env dosyasında TOKEN_EXPIRY tanımlı olmalı
        );
        
        // Token ile birlikte başarılı giriş mesajını ve öğrenci bilgilerini dönme
        res.json({
            message: 'Login successful',
            token: accessToken,
            student: { id: student.stu_id, name: student.stu_name, surname: student.stu_surname, email: student.stu_mail, uni_id: student.uni_id }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//accountpage for registered student

router.get('/account', validateToken, async (req, res) => {
    try {
        const stu_id = req.user.stu_id;
        const student = await Student.findOne({
            where: { stu_id },
            attributes: ['stu_name', 'stu_surname', 'stu_mail', 'uni_id'],
            include: [{
                model: University,
                attributes: ['uni_name', 'uni_email']
            }]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({
            name: student.stu_name,
            surname: student.stu_surname,
            university: student.University.uni_name,
            student_email: student.stu_mail
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







router.use(validateToken);

module.exports = router;