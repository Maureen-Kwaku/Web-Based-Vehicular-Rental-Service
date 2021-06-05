const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: false },
    message: { type: String, trim: true, required: true },
  },
  { timestamps: true },
);

exports.FeedBackModel = model('feedback', schema);
