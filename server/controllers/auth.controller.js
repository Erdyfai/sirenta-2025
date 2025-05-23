const generateToken  = require("../config/utils.js");
const { users: User } = require("../models");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { nim, password } = req.body;
  console.log('User:', User);

  try {
    const user = await User.findOne({ where: { nim } }); 

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user.id, user.role, res);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      nim: user.nim,
      angkatan: user.angkatan,
      gender: user.gender,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0});
    res.status(200).json({ message: "Logout succesfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message)
    res.status(500).json({ message: "Internal Server Error"});
  }
};
  
const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  
module.exports = {login, logout, checkAuth};
