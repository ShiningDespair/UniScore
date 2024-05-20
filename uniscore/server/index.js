const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const dotenv = require('dotenv');
require('dotenv').config();
dotenv.config(); 

console.log('JWT_SECRET:', process.env.JWT_SECRET); 

app.use(express.json());
app.use(cors());


// Routers
const universityRouter = require('./routes/Universities');
app.use('/Universities', universityRouter);

const rateRouter = require('./routes/Rates');
app.use('/Rates',rateRouter);

const studentRouter = require('./routes/Students');
app.use('/Students', studentRouter);





// Sequelize ile veritabanı senkronizasyonu
db.sequelize
.sync()
.then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log('Server running on port 3001');
    });
}).catch(error => {
    console.error('Error syncing database:', error);
});
