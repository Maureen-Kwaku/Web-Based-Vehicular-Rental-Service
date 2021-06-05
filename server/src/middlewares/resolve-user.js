const { tokenManager } = require('../helpers');

async function resolveUser({ token }) {
  try {
    const __admin = await tokenManager.validateToken(token);
    let admin = {
      _id: __admin.id,
    };
    return admin;
  } catch (e) {
    return new Error('AuthenticationError');
  }
}

module.exports = resolveUser;
