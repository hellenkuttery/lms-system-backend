const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Tüm kullanıcıları getir
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Kullanıcı ekle
router.post('/', async (req, res) => {
  const { firstname, lastname, email, username, password, role } = req.body;

  // Yeni kullanıcı nesnesi oluştur
  const user = new User({
    firstname,
    lastname,
    email,
    username,
    password,
    role,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
