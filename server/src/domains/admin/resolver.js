const { authenticateAdmin } = require('../../middlewares');
const {
  deleteAdmin,
  updateAdmin,
  createAdmin,
  getAdmin,
  getAdminsLength,
  getAdmins,
  loginAdmin,
  updatePassword,
  sendCode,
  resendCode,
  resetAdminPassword,
} = require('./actions');

module.exports = {
  Query: {
    admins: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getAdmins(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    adminsLength: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getAdminsLength(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    admin: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getAdmin(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
  Mutation: {
    createAdmin: authenticateAdmin(async function (_, args, { user }, info) {
      try {
        const result = await createAdmin(args, user._id);
        return result;
      } catch (err) {
        return err;
      }
    }),
    updateAdmin: authenticateAdmin(async function (_, args, { user }, info) {
      try {
        const result = await updateAdmin(args, user._id);
        return result;
      } catch (err) {
        return err;
      }
    }),
    deleteAdmin: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await deleteAdmin(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    loginAdmin: async function (_, args, context, info) {
      try {
        const result = await loginAdmin(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    updateAdminPassword: authenticateAdmin(async function (_, args, { user }, info) {
      try {
        const result = await updatePassword(args, user._id);
        return result;
      } catch (err) {
        return err;
      }
    }),
    sendAdminCode: async function (_, args, context, info) {
      try {
        const result = await sendCode(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    resendAdminCode: async function (_, args, context, info) {
      try {
        const result = await resendCode(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    resetAdminPassword: async function (_, args, context, info) {
      try {
        const result = await resetAdminPassword(args);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};
