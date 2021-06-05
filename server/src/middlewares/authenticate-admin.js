const { AuthenticationError } = require('apollo-server-express');

const authenticate = (fn) => {
  return (root, args, context, info) => {
    if (context.user instanceof Error || !context.user) {
      return new AuthenticationError('Authentication Failed');
    }
    return fn(root, args, context, info);
  };
};

module.exports = authenticate;
