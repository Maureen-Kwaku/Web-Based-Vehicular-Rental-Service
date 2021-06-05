'use strict';

const { Schema, model, SchemaTypes } = require('mongoose');

const PaymentSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    rental: {
      type: SchemaTypes.ObjectId,
      ref: 'rental',
      required: true,
    },
    authorizationUrl: {
      type: String,
      required: false,
    },
    accessCode: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['Pending', 'Successful', 'Failed'],
      default: 'Pending',
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

exports.PaymentModel = model('payment', PaymentSchema);
