const { authenticateAdmin } = require('../../middlewares');

const {
  createRental,
  cancelRental,
  approveRental,
  pickupRental,
  finishRentalProcess,
  getRental,
  getRentalsLength,
  getRentals,
} = require('./actions');

module.exports = {
  Query: {
    rentals: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getRentals(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    rentalsLength: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getRentalsLength(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    rental: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getRental(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
  Mutation: {
    createRental: async function (_, args, { user }, info) {
      try {
        const result = await createRental(args, user._id);
        return result;
      } catch (err) {
        return err;
      }
    },
    cancelRental: async function (_, args, context, info) {
      try {
        const result = await cancelRental(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    approveRental: async function (_, args, { user }, info) {
      try {
        const result = await approveRental(args, user._id);
        return result;
      } catch (err) {
        return err;
      }
    },

    pickupRental: async function (_, args, context, info) {
      try {
        const result = await pickupRental(args);
        return result;
      } catch (err) {
        return err;
      }
    },

    finishRentalProcess: async function (_, args, context, info) {
      try {
        const result = await finishRentalProcess(args);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};
