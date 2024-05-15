const Sequelize = require('sequelize'); 

const sequelize = new sequelize ('uniproje_newssoapof','uniproje_newssoapof','109433754d28bd2452dfab0ff1a9c6a868216fce',{
    host: 'p7v.h.filess.io',
    port: 3307,
    dialect: 'mysql'


})

sequelize.authenticate() .then(() => {
    console.log("Connection Succesful !");
}) .catch((err) =>{
    console.log("Connection Error to Database !");
    
});
