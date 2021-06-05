const axios = require('axios');
const lodash = require('lodash');

const net = axios.create({
  baseURL: 'https://api.paystack.co/transaction/',
  timeout: process.env.MAIL_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: `Bearer ${process.env.PAYMENT_SECRET}`,
  },
});

function __setMail(_mail) {
  return lodash.chain(_mail).toLower().value();
}

async function __initializePayment({ amount, email, reference, metadata = {} }) {
  return new Promise(async function (resolve, reject) {
    await net
      .post('/initialize', {
        amount: String(amount),
        email: __setMail(email),
        reference: reference,
        metadata: metadata,
        currency: 'GHS',
        channels: ['card', 'mobile_money'],
        // callback_url: process.env.PAYMENT_CALLBACK,
      })
      .then(function ({ data }) {
        resolve(data);
      })
      .catch(reject);
  });
}

async function __verifyPayment({ reference }) {
  return new Promise(async function (resolve, reject) {
    await net
      .get(`/verify/${reference}`)
      .then(function ({ data }) {
        resolve(data);
      })
      .catch(reject);
  });
}

module.exports = {
  __initializePayment,
  __verifyPayment,
};
