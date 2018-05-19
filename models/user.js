const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      user.password = hash;
      next();
    })

  })

});

userSchema.methods.comparePassword = function (candidatePassword, callback) {

  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {

    if (err) { return callback(err); }

    return callback(null, isMatch);

  });

}

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;