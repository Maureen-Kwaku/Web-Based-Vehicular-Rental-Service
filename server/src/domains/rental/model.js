const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    car: { type: mongoose.SchemaTypes.ObjectId, ref: 'car' },
    code: {
      type: String,
    },
    amount: { type: Number },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
    accepted: {
      by: { type: mongoose.SchemaTypes.ObjectId, ref: 'admin' },
      at: { type: Date },
    },
    pickup: {
      address: { type: String, trim: true },
      at: { type: Date },
    },
    dropoff: {
      address: { type: String, trim: true },
      at: { type: Date },
    },
    status: {
      type: String,
      enum: ['Requested', 'Paid', 'Accepted', 'PickedUp', 'DroppedOff', 'Cancelled'],
      default: 'Requested',
      required: true,
    },
    payment: { type: mongoose.SchemaTypes.ObjectId, ref: 'payment' },
    cancellation: {
      reason: { type: String, trim: true },
      at: { type: Date },
    },
    paidAt: { type: Date },
    pickedUpAt: { type: Date },
    droppedOffAt: { type: Date },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
);

exports.RentalModel = mongoose.model('rental', schema);
