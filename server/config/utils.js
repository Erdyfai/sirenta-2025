const jwt = require("jsonwebtoken");

function generateToken(userId, role, res) {
    const expiresInMs = 60 * 60 * 1000; // 1 jam dalam milidetik

    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "1h", // token expired dalam 1 jam
    });

    res.cookie("jwt", token, {
        maxAge: expiresInMs, // cookie juga expired dalam 1 jam
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}

module.exports = generateToken;
