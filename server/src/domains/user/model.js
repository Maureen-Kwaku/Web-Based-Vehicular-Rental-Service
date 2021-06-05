const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const tokenManager = require('../../helpers/token-manager');

const manipulatePhone = (phone) => _.chain(phone).slice(-9).join('').padStart(12, '233').value();

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, required: true, trim: true, set: manipulatePhone, unique: true },
    password: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
);

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

schema.methods.generateAuthToken = async function () {
  return await tokenManager.generateToken(
    {
      id: this._id,
    },
    '24h',
  );
};

schema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

exports.UserModel = mongoose.model('user', schema);
