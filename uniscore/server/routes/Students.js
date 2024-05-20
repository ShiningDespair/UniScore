const express = require('express');
const router = express.Router();
const { Student, University, TempStudent } = require('../models');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');
const nodemailer = require('nodemailer');

// Setup email transporter with environment variables for security
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uniskortr@gmail.com',
        pass: 'guok fnwg kxbs ngaq'
    }
});

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Check if JWT_SECRET is working

// Token expiration time
const TOKEN_EXPIRY = '5000m';

// Get all students
router.get('/', async (req, res) => {
    try {
        const listOfStudents = await Student.findAll();
        res.json(listOfStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Register a new student and send verification email
router.post('/', async (req, res) => {
    try {
        const { stu_pw, uni_id, stu_mail, ...studentData } = req.body;

        const university = await University.findByPk(uni_id);
        if (!university) {
            return res.status(400).json({ error: 'University not found' });
        }

        const existingStudent = await Student.findOne({ where: { stu_mail } });
        if (existingStudent) {
            return res.status(400).json({ error: 'Student with this email already registered' });
        }

        const studentEmail = stu_mail;
        const universityEmailStructure = university.uni_email_structure;
        const regex = new RegExp(`@.*${universityEmailStructure}$`);

        if (!regex.test(studentEmail)) {
            return res.status(400).json({ error: 'Student email domain does not match university email domain' });
        }

        const hashedPassword = await bcrypt.hash(stu_pw, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000);;
        const verificationLink = `http://localhost:3000/verify?email=${encodeURIComponent(studentEmail)}&code=${verificationCode}`;

        const mailOptions = {
            from: "uniskortr@gmail",
            to: studentEmail,
            subject: 'UniScore Email Verification',
            html: `Please click the following link to verify your email address: <a href="${verificationLink}">${verificationLink}</a>`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error sending verification email' });
            } else {
                console.log('Email sent: ' + info.response);
                await TempStudent.create({ ...studentData, stu_pw: hashedPassword, uni_id, stu_mail, verificationCode });
                res.status(201).json({ message: 'Verification email sent' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error in Post' });
    }
});

// Email verification route
router.get('/verify', async (req, res) => {
    try {
        const { email, code } = req.query;
        console.log(`Verification requested for email: ${email}, code: ${code}`);
        
        if (!email || !code) {
            console.log("Email or code not provided");
            return res.status(400).json({ error: 'Email or code not provided' });
        }

        const tempStudent = await TempStudent.findOne({ where: { verificationCode: code } });

        console.log("Temporary student found:", tempStudent);

        const newStudent = await Student.create({
            stu_id: tempStudent.stu_id, 
            stu_name: tempStudent.stu_name,
            stu_surname: tempStudent.stu_surname,
            stu_mail: tempStudent.stu_mail,
            stu_pw: tempStudent.stu_pw,
            stu_phone: tempStudent.phone,
            stu_promotional: tempStudent.stu_promotional,
            uni_id: tempStudent.uni_id,
            is_anon: tempStudent.is_anon

        });
        console.log("New student created:", newStudent);

        await TempStudent.destroy({ where: { stu_mail: email } });
        console.log(`Temporary student with email: ${email} deleted`);

        res.status(201).json({ message: 'Verification successful', newStudent });
        console.log("Registration completed successfully");
    } catch (error) {
        console.error("Error during verification process:", error);
        res.status(500).json({ error: 'Internal Server Error in Verification' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    try {
        const { stu_mail, stu_pw } = req.body;
        const student = await Student.findOne({ where: { stu_mail } });

        if (!student) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(stu_pw, student.stu_pw);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const accessToken = sign(
            { stu_mail: student.stu_mail, stu_id: student.stu_id },
            process.env.JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        res.json({
            message: 'Login successful',
            token: accessToken,
            student: {
                id: student.stu_id,
                name: student.stu_name,
                surname: student.stu_surname,
                email: student.stu_mail,
                uni_id: student.uni_id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Account page for registered student
router.get('/account', validateToken, async (req, res) => {
    try {
        const stu_id = req.user.stu_id;
        const student = await Student.findOne({
            where: { stu_id },
            attributes: ['stu_id', 'stu_name', 'stu_surname', 'stu_mail', 'uni_id'],
            include: [{
                model: University,
                attributes: ['uni_name', 'uni_email', 'uni_logo']
            }]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({
            student: {
                id: student.stu_id,
                name: student.stu_name,
                surname: student.stu_surname,
                email: student.stu_mail,
                uni_id: student.uni_id,
                university: student.University.uni_name,
                university_email: student.University.uni_email,
                uni_logo: student.University.uni_logo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Logout route
router.post('/logout', validateToken, (req, res) => {
    res.json({ message: 'Logout successful' });
});

module.exports = router;
