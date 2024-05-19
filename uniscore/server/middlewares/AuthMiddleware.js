// AuthMiddleware.js
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ error: "User not logged in" });

    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);

        if (validToken) {
            req.user = validToken;  // doğrulanan kullanıcı bilgilerini ekle
            console.log('JWT Token:', accessToken); // JWT token'ı konsola yazdır
            return next();
        }
    } catch (err) {
        return res.json({ error: err });
        console.log('JWT Token:', accessToken); // JWT token'ı konsola yazdır
    }
};

module.exports = { validateToken };
