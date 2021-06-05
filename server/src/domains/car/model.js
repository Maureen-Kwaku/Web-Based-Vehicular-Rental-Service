const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    featured: { type: Boolean, required: true, default: false },
    price: { type: Number, required: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    chassis: { type: String, trim: true },
    vin: { type: String, trim: true },
    description: { type: String, trim: true },
    plateNumber: { type: String, trim: true, required: true },
    images: [{ type: String }],
    status: { type: String, enum: ['Rented', 'Available'], default: 'Available', required: true },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'admin' },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
);

exports.CarModel = mongoose.model('car', schema);
