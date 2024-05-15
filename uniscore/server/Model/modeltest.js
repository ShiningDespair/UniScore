const Sequelize = require('sequelize');

const sequelize = new Sequelize('uniproje_newssoapof', 'uniproje_newssoapof', '109433754d28bd2452dfab0ff1a9c6a868216fce', {
    host: 'p7v.h.filess.io',
    port: 3307,
    dialect: 'mysql',
}); 

sequelize.authenticate().then(() => {
    console.log("Connection Successful !");
}).catch((err) =>{
    console.error("Connection Error to Database:", err);
});

// Örnek bir sorgu
sequelize.query('SELECT uni_name FROM universities', { type: sequelize.QueryTypes.SELECT })
  .then(results => {
    console.log("Results:", results);
  })
  .catch(error => {
    console.error("Query Error:", error);
  });
