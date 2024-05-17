const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');


app.use(express.json());
app.use(cors());


// Routers
const universityRouter = require('./routes/universities');
app.use('/Universities', universityRouter);

const rateRouter = require('./routes/rates');
app.use('/Rates',rateRouter);

const studentRouter = require('./routes/students');
app.use('/Students',studentRouter);



// Sequelize ile veritabanı senkronizasyonu
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });
}).catch(error => {
    console.error('Error syncing database:', error);
});
