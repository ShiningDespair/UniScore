const express = require('express');
const router = express.Router();
const { Student } = require('../models');

router.get('/', async (req, res) => {
    try{
        const listOfStudents= await Student.findAll();
        res.json(listOfStudents);
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'Internal Server Error'});
    }
});


router.post('/', async (req, res) => {
    try{
        const studentData = req.body;
        const newStudent = await Student.create(studentData);
        res.status(201).json(newStudent);
      }
      catch(error){
          res.status(500).json({error :'Internal Server Error in Post'});
     }
});

module.exports = router;
