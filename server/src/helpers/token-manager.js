const jwt = require('jsonwebtoken');

async function generateToken(payload, expiry) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      process.env.APP_SECRET,
      {
        expiresIn: expiry ? expiry : '24h',
        issuer: process.env.APP_NAME,
      },
      function (err, token) {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
}

async function validateToken(token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.APP_SECRET, function (err, payload) {
      if (err) reject(err);
      resolve(payload);
    });
  });
}

module.exports = {
  generateToken,
  validateToken,
};
