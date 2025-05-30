const jwt = require("jsonwebtoken");

function generateToken(userId, role, res) {
    const expires = 1000 * 60 * 60 * 24; // 1  hari

    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "1d", // token expired dalam 1 hari
    });

    res.cookie("jwt", token, {
        maxAge: expires, // cookie juga expired dalam 1 jam
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    });

    return token;
}

module.exports = generateToken;
