const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        return passwordRegex.test(value); // Şifre regex ile kontrol edilir
      },
      message: props => 
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (+%&()!) and must be at least 8 characters long.'
    }
  },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
});

module.exports = mongoose.model('User', userSchema);
