const { authenticateAdmin } = require('../../middlewares');

const {
  deleteUser,
  updateUser,
  createUser,
  getUser,
  getUsersLength,
  getUsers,
  loginUser,
  //   updatePassword,
  //   sendCode,
  //   resendCode,
  //   resetUserPassword,
} = require('./actions');

module.exports = {
  Query: {
    users: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getUsers(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    usersLength: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getUsersLength(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    user: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getUser(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
  Mutation: {
    createUser: async function (_, args, context, info) {
      try {
        const result = await createUser(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    updateUser: async function (_, args, { user }, info) {
      try {
        const result = await updateUser(args, user._id);
        return result;
      } catch (err) {
        return err;
      }
    },

    deleteUser: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await deleteUser(args);
        return result;
      } catch (err) {
        return err;
      }
    }),

    loginUser: async function (_, args, context, info) {
      try {
        const result = await loginUser(args);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};
